import React, { useContext, useEffect, useState } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import { Context } from "..";
import { PERSONE_ROUTE, REACT_APP_API_URL } from "../utils/consts";
import {
  fetchPersonesForTree,
  createPersone,
  changeOnePersone,
  deletePersone,
} from "../http/personeAPI";
import { checkId } from "../routes";
import { Spinner } from "react-bootstrap";

const Tree = () => {
  const { user } = useContext(Context);
  const [persones, setPersones] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      console.log(checkId());
      fetchPersonesForTree(checkId())
        .then((data) => {
          console.log(data);
          setPersones(data.rows);
        })
        .finally(() => {
          if (
            persones !== undefined &&
            persones.length === 0 &&
            checkId() ===
              (Number.isInteger(user.user.id) ? user.user.id.toString() : "0")
          ) {
            createPersone({
              firstname: "Я",
              parent: 0,
              user: user.user.id,
              info: '[{"title": "Дата рождения", "description":""},{"title": "Страна", "description":""},{"title": "Город", "description":""}]',
            });
          }
          console.log(persones);

          setLoading(false);
        });
    }
  });

  let branchs = [];

  //let link = []
  //const history = useNavigate;

  const createBranches = (persones) => {
    console.log(persones);
    for (let i = 0; i < persones.length; i++) {
      const persone = persones[i];
      let color = "#ccc";
      if (persone.gender === "men") {
        color = "#a1a7cc";
      } else if (persone.gender === "women") {
        color = "#cca1a1";
      }
      branchs[i] = {
        key: persone.id,
        parent: persone.parent,
        lastname: persone.lastname,
        firstname: persone.firstname,
        surname: persone.surname,
        img: persone.img,
        color: color,
      };
      // link[i] = {
      //  key: -(i + 1),
      //  from: persone.id,
      // to: persone.parent,
      //};
      //console.log(link[i]);
    }
  };

  const textStyle = { margin: new go.Margin(2, 10, 0, 0), stroke: "white" };

  function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram = $(go.Diagram, {
      "undoManager.isEnabled": true, // must be set to allow for model change listening
      layout: new go.TreeLayout({ angle: 90, layerSpacing: 35 }), // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
      //"clickCreatingTool.archetypeNodeData": {
      // firstname: "new persone",
      // color: "#a1a7cc",
      //},
      model: new go.TreeModel({
        linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      }),
    });

    function findHeadShot(img) {
      if (!img) {
        console.log("i suck");
        return REACT_APP_API_URL + "undefined.jpg";
      } // There are only 16 images on the server
      console.log(img);
      return REACT_APP_API_URL + img;
    }
    // define a simple Node template
    diagram.nodeTemplate = $(
      go.Node,
      "Auto", // the Shape will go around the TextBlock
      {
        // here the second argument is this object, which is this Node
        doubleClick: (e, node) => {
          window.open(".." + PERSONE_ROUTE + "/" + node.key);
        },
      },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      $(
        go.Shape,
        "RoundedRectangle",
        {
          name: "SHAPE",
          fill: "#ccc",
          strokeWidth: 0,
        },
        new go.Binding("fill", "color")
      ),
      $(
        go.Panel,
        "Horizontal",
        $(
          go.Picture,
          {
            source: REACT_APP_API_URL + "undefined.jpg",
            margin: 5,
            width: 60,
            height: 60,
            background: "white",
            imageStretch: go.GraphObject.UniformToFill,
          },
          new go.Binding("source", "img", findHeadShot)
        ),
        $(
          go.Panel,
          "Vertical",
          $(
            go.TextBlock,
            textStyle, // some room around the text
            new go.Binding("text", "lastname").makeTwoWay()
          ),
          $(
            go.TextBlock,
            textStyle, // some room around the text
            new go.Binding("text", "firstname").makeTwoWay()
          ),
          $(
            go.TextBlock,
            textStyle, // some room around the text
            new go.Binding("text", "surname").makeTwoWay()
          )
        )
      )
    );

    if (
      checkId() ===
      (Number.isInteger(user.user.id) ? user.user.id.toString() : "0")
    ) {
      diagram.nodeTemplate.contextMenu = $(
        "ContextMenu",
        $("ContextMenuButton", $(go.TextBlock, "Добавить Родственика"), {
          click: (e, button) => {
            const node = button.part.adornedPart;
            if (node !== null) {
              const thisemp = node.data;
              diagram.startTransaction("add employee");
              const newemp = {
                firstname: "Родственник",
                parent: thisemp.key,
              };
              diagram.model.addNodeData(newemp);
              const newnode = diagram.findNodeForData(newemp);
              if (newnode) newnode.location = node.location;
              createPersone({
                firstname: newemp.firstname,
                parent: newemp.parent,
                user: user.user.id,
                info: '[{"title": "Дата рождения", "description":""},{"title": "Страна", "description":""},{"title": "Город", "description":""}]',
              }).finally(() => diagram.commitTransaction("add employee"));
            }
          },
        }),
        $("ContextMenuButton", $(go.TextBlock, "Удалить Родственника"), {
          click: (e, button) => {
            // reparent the subtree to this node's boss, then remove the node
            const node = button.part.adornedPart;
            if (node !== null) {
              diagram.startTransaction("reparent remove");
              const chl = node.findTreeChildrenNodes();
              // iterate through the children and set their parent key to our selected node's parent key
              while (chl.next()) {
                const emp = chl.value;

                changeOnePersone(emp.data.key, {
                  parent: node.findTreeParentNode().data.key,
                });
                diagram.model.setParentKeyForNodeData(
                  emp.data,
                  node.findTreeParentNode().data.key
                );
              }

              diagram.model.removeNodeData(node.data);

              deletePersone(node.data.key).finally(() =>
                diagram.commitTransaction("reparent remove")
              );
            }
          },
        }),
        $("ContextMenuButton", $(go.TextBlock, "Удалить Родственника и Цепь"), {
          click: (e, button) => {
            // remove the whole subtree, including the node itsel
            const node = button.part.adornedPart;
            let ids = [node.data.key];
            for (let i = 0; i < ids.length; i++) {
              branchs.forEach((persone) => {
                if (persone.parent === ids[i] && persone.parent) {
                  ids.push(persone.key);
                }
              });
            }
            for (let i = 0; i < ids.length; i++) {
              deletePersone(ids[i]);
            }
            if (node !== null) {
              diagram.startTransaction("remove dept");
              diagram.removeParts(node.findTreeParts());
              diagram.commitTransaction("remove dept");
            }
          },
        })
      );
    }

    diagram.linkTemplate = $(
      go.Link,
      { routing: go.Link.Orthogonal, corner: 5 },
      new go.Shape({ strokeWidth: 3, stroke: "#ccc" })
    );

    return diagram;
  }

  /**
   * This function handles any changes to the GoJS model.
   * It is here that you would make any updates to your React state, which is discussed belo.
   */
  function handleModelChange(changes) {
    // console.log(changes);
  }

  if (loading) {
    return (
      <div>
        <Spinner animation={"grow"} />
        <h2>Дерево загружается</h2>
      </div>
    );
  }
  createBranches(persones);
  return (
    <div>
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="diagram-component"
        nodeDataArray={branchs}
        onModelChange={handleModelChange}
      />
    </div>
  );
};

export default Tree;

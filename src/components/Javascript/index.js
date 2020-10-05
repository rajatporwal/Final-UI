import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { twilight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import javaScriptConfig from "../../config/javaScriptConfig";
import { Table } from "antd";

// const getChildren = (children) =>
//   children.map((child) => {
//     return { pathname: "/javascript", id: child.id, title: child.title };
//   });

const JavaScript = () => {
  const dispatch = useDispatch();
  // const options = javaScriptConfig.map((js) => {
  //   return { heading: js.heading, children: getChildren(js.children) };
  // });
  useEffect(() => {
    dispatch({ type: "SIDE_BAR_OPTIONS", value: javaScriptConfig });
    dispatch({ type: "SHOW_MENU", value: true });
  });

  return (
    <div>
      {javaScriptConfig.map((ele) => (
        <>
          <h1>{ele.heading}</h1>
          <hr />
          {ele.children.map((child) => (
            <div className="javascript">
              <h2
                className="heading_3"
                refs={child.id}
                id={child.id}
                name={child.id}
              >
                {child.title}
              </h2>
              {child.desciption ? (
                <p dangerouslySetInnerHTML={{ __html: child.desciption }} />
              ) : null}
              {child.list ? (
                <ul>
                  {child.list.map((v) => (
                    <li dangerouslySetInnerHTML={{ __html: v }} />
                  ))}
                </ul>
              ) : null}
              <div>
                {child.code &&
                  child.code.map((e) => (
                    <>
                      {e.title ? <p> - {e.title}</p> : null}
                      <SyntaxHighlighter
                        language="javascript"
                        style={okaidia}
                        showLineNumbers
                      >
                        {e.code}
                      </SyntaxHighlighter>
                    </>
                  ))}
              </div>
              <div>
                {child.table
                  ? child.table.map((t) => (
                      <>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: `- ${t.title}`
                          }}
                        />
                        <Table
                          columns={t.columns}
                          dataSource={t.data.map((d, i) => {
                            d["index"] = i + 1;
                            return d;
                          })}
                          scroll={{ y: 500, x: "100vw" }}
                        />
                      </>
                    ))
                  : null}
              </div>
              {child.note ? (
                <p
                  className="note"
                  dangerouslySetInnerHTML={{
                    __html: `Note: ${child.note}`
                  }}
                />
              ) : null}
            </div>
          ))}
        </>
      ))}
    </div>
  );
};

export default JavaScript;

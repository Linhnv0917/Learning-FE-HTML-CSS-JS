"use client";
import { FC, useState } from "react";
import { Button, Card, Input, message, Table } from "antd";
import { v4 as uuidv4 } from "uuid";

// Style
import "./style.css";

interface Todo {
  key: string;
  value: string;
}

const TodoList: FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [rowData, setRowData] = useState<Todo>();

  const onAdd = (value: string) => {
    const todo = todoList.find((todo: Todo) => todo.value === value);
    if (todo) {
      alert(`${value} already exist in todolist`);
    } else {
      setTodoList([
        ...todoList,
        {
          key: uuidv4(),
          value: value,
        },
      ]);
    }
  };

  const onEdit = (todo: Todo) => {
    setRowData(todo);
    setIsEdit(true);
  };

  const onSubmit = () => {
    setTodoList(
      todoList.map((todo) => (todo.key === rowData?.key ? rowData : todo))
    );
    setIsEdit(false);
  };

  const onCancel = () => {
    setIsEdit(false);
  };

  const onDelete = (key: string) => {
    setTodoList(todoList.filter((todo: Todo) => todo.key !== key));
  };

  return (
    <div className="container">
      <Card
        title="Work to do"
        style={{
          width: "50vw",
          height: "80vh",
          margin: "auto",
        }}
      >
        <Input
          addonBefore="Work to do:"
          placeholder={"Enter work to do here!"}
          name={"todo"}
          onPressEnter={(e: React.KeyboardEvent<HTMLInputElement>) =>
            onAdd((e.target as HTMLInputElement).value)
          }
        />
        <Table
          columns={[
            {
              key: "value",
              title: "Todo",
              dataIndex: "value",
              render: (_, row) => (
                <div style={{ width: "25vw" }}>
                  {isEdit && rowData?.key === row.key ? (
                    <Input
                      style={{ width: "90%" }}
                      value={rowData?.value}
                      onChange={(e) =>
                        setRowData({
                          ...rowData,
                          value: e.target.value,
                        } as Todo)
                      }
                    ></Input>
                  ) : (
                    <p>{row.value}</p>
                  )}
                </div>
              ),
            },
            {
              key: "action",
              title: "Action",
              dataIndex: "",
              width: "260px",
              align: "right",
              render: (_, row) => {
                return (
                  <div>
                    {isEdit && row.key === rowData?.key ? (
                      <>
                        <Button
                          variant="text"
                          color="blue"
                          onClick={() => onSubmit()}
                        >
                          Submit
                        </Button>
                        <Button
                          variant="text"
                          color="orange"
                          onClick={onCancel}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="text"
                        color="purple"
                        onClick={() => onEdit(row)}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="text"
                      color="danger"
                      onClick={() => onDelete(row.key)}
                    >
                      Delete
                    </Button>
                  </div>
                );
              },
            },
          ]}
          dataSource={todoList}
          scroll={{ y: "40vh" }}
        />
      </Card>
    </div>
  );
};

export default TodoList;

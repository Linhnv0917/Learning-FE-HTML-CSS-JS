"use client";
import { FC, useState } from "react";
import { Button, Card, Input, message, Table } from "antd";
import { v4 as uuidv4 } from "uuid";
import DialogConfirm from "./DialogConfirm";

// Style
import "./style.css";
import { valueType } from "antd/es/statistic/utils";

interface Todo {
  key: string;
  value: string;
}

const TodoList: FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [rowData, setRowData] = useState<Todo>();
  const [dataDelete, setDataDelete] = useState<Todo>();
  const [inputValue, setInputValue] = useState<string>();

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
      setInputValue("");
    }
  };

  const onEdit = (todo: Todo) => {
    if (isEdit && todo) {
      setEditDialogOpen(true);
    } else {
      setRowData(todo);
      setIsEdit(true);
    }
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

  const onDelete = (data: Todo) => {
    setDataDelete(data);
    setDeleteDialogOpen(true);
  };

  const deleteTodo = () => {
    setTodoList(todoList.filter((todo: Todo) => todo.key !== dataDelete?.key));
  };

  const { setIsDialogOpen: setEditDialogOpen, renderDialog: renderEditDialog } =
    DialogConfirm({
      action: "edit",
      function: "todo",
      submitFunction: onSubmit,
      displayName: rowData?.value,
    });

  const {
    setIsDialogOpen: setDeleteDialogOpen,
    renderDialog: renderDeleteDialog,
  } = DialogConfirm({
    action: "delete",
    function: "todo",
    submitFunction: deleteTodo,
    displayName: dataDelete?.value,
  });

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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Table
          columns={[
            {
              key: "value",
              title: "Todo",
              dataIndex: "value",
              render: (_, row) => (
                <div style={{ width: "32vw" }}>
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
                      onPressEnter={() => onSubmit()}
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
              width: "200px",
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
                      <>
                        <Button
                          variant="text"
                          color="purple"
                          onClick={() => onEdit(row)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="text"
                          color="danger"
                          onClick={() => onDelete(row)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                );
              },
            },
          ]}
          dataSource={todoList}
          scroll={{ y: "40vh" }}
        />
        {renderEditDialog()}
        {renderDeleteDialog()}
      </Card>
    </div>
  );
};

export default TodoList;

import { useState } from "react";
import { Button, Modal } from "antd";

interface dialogProp {
  action?: string;
  function?: string;
  loading?: boolean;
  submitFunction: Function;
  displayName?: string;
}

const DialogConfirm = (props: dialogProp) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onClose = () => {
    setIsDialogOpen(false);
  };

  const renderDialog = () => {
    return (
      <Modal
        title={`Do you want to ${props.action} ${props.function}?`}
        open={isDialogOpen}
        onCancel={onClose}
        footer={
          <>
            <Button htmlType="button" onClick={onClose}>
              Cancel
            </Button>
            <Button
              loading={props.loading}
              type="primary"
              onClick={() => {
                props.submitFunction();
                onClose();
              }}
            >
              Submit
            </Button>
          </>
        }
      >
        <p>
          {props.action === "edit"
            ? "Do you want to save"
            : "Do you really want to"}{" "}
          {props.action} {props.function}:{" "}
          <span style={{ color: "red" }}>{props.displayName}</span>
        </p>
      </Modal>
    );
  };
  return { setIsDialogOpen, renderDialog };
};

export default DialogConfirm;

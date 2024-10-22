import React from "react";

import { Row } from "@tanstack/react-table";
import { CreateEditModeEnum } from "@/constants/enum";
import { IUser } from "@/server/db/models/user-model";
import { DeleteUsersDialog } from "../delete-users-dialog";
import { CreateEdituserDialog } from "../create-edit-user-dialog";

interface PropTypes {
    row: Row<IUser>;
}

const UsersTableRowActions = ({ row }: PropTypes) => {
    const [showDeleteProduct, setShowDeleteProduct] = React.useState(false);

    return (
        <div className="flex gap-2">
            <CreateEdituserDialog mode={CreateEditModeEnum.EDIT} user={row.original} />
            <DeleteUsersDialog
                open={showDeleteProduct}
                onOpenChange={setShowDeleteProduct}
                users={[row.original]}
                showTriggerText={false}
                onSuccess={() => row.toggleSelected(false)}
            />
        </div>
    );
};

export default UsersTableRowActions;

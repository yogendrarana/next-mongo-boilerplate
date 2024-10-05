import React from "react";
import { getUsers } from "../_lib/queries";
import { formatMongoData } from "@/helpers";
import { AuthProviderEnum, UserRoleEnum } from "@/constants/enum";
import { UsersTable } from "./table/users-table";
import { authProviders } from "@/constants";

interface PropTypes {
    getUsersPromise: ReturnType<typeof getUsers>;
}

const UsersComponent = ({ getUsersPromise }: PropTypes) => {
    const {
        data: { users, pageCount }
    } = React.use(getUsersPromise);

    return (
        <UsersTable
            tableData={formatMongoData(users)}
            pageCount={pageCount}
            roles={Object.values(UserRoleEnum)}
            authProviders={Object.values(AuthProviderEnum)}
        />
    );
};

export default UsersComponent;

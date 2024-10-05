import React from "react";
import { getUsers } from "./_lib/queries";
import { SearchParams } from "@/constants/types";
import UsersComponent from "./_components/users-component";
import { searchUsersParamsSchema } from "./_lib/validations";

export interface AdminUsersPageProps {
    searchParams: SearchParams;
}

const AdminProductsPage = ({ searchParams }: AdminUsersPageProps) => {
    const search = searchUsersParamsSchema.parse(searchParams);
    const getUsersPromise = getUsers(search);

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <UsersComponent getUsersPromise={getUsersPromise} />
        </React.Suspense>
    );
};

export default AdminProductsPage;

import { Session } from "next-auth";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Props = {
  label: string;
  user?: Session["user"];
};

function UserInfo({ label, user }: Props) {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">ID</p>
          <p className="text-sm font-light truncate max-w-[180px] bg-slate-100 rounded-md font-mono p-1">
            {user?.id}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Name</p>
          <p className="text-sm font-light truncate max-w-[180px] bg-slate-100 rounded-md font-mono p-1">
            {user?.name}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="text-sm font-light truncate max-w-[180px] bg-slate-100 rounded-md font-mono p-1">
            {user?.email}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Role</p>
          <p className="text-sm font-light truncate max-w-[180px] bg-slate-100 rounded-md font-mono p-1">
            {user?.role}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Email</p>
          <p className="text-sm font-light truncate max-w-[180px] bg-slate-100 rounded-md font-mono p-1">
            {user?.email}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserInfo;

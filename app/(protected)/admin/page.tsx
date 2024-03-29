"use client";

import { AdminAction } from "@/actions/admin";
import RoleGate from "@/components/auth/role-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FormSuccess from "@/components/ui/form-success";
import { ERROR_MESSAGES } from "@/global/constant-msgs";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

type Props = {};

function AdminPage({}: Props) {
  const onApiRouteClick = async () => {
    const response = await fetch("/api/admin", {
      method: "GET",
    });
    if (response.ok) {
      toast.success("Welcome Admin");
    } else {
      toast.error(ERROR_MESSAGES.PermissionDenied);
    }
  };

  const onAdminActionClick = async () => {
    try {
      const response = await AdminAction();
      if (response.error) {
        toast.error(response.error);
      }

      if (response.success) {
        toast.success(response.success);
      }
    } catch (error) {
      return null;
    }
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRoles={[UserRole.ADMIN]}>
          <FormSuccess message="Welcome Admin!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onAdminActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminPage;

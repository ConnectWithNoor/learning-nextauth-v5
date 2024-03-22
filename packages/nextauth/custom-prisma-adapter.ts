import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, UserRole as UserRoleSchemaType } from "@prisma/client";

function customPrismaAdapter(db: PrismaClient): Adapter {
  return {
    ...PrismaAdapter(db),
    // @ts-ignore
    createUser: (data) => {
      // the data is coming from the profile function in the providers
      // @ts-ignore
      const { isUserVerified, ...rest } = data;

      const userData = {
        ...rest,
        emailVerified: isUserVerified ? new Date() : null,
        role: UserRoleSchemaType.USER,
      };
      return db.user.create({ data: userData });
    },
  };
}

export default customPrismaAdapter;

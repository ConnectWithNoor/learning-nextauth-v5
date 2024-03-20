import { auth, signOut } from "@/auth";

type Props = {};

async function SettingsPage({}: Props) {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">sign out</button>
      </form>
    </div>
  );
}

export default SettingsPage;

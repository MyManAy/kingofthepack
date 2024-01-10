import PageCenterLayout from "../components/Layouts/PageCenterLayout";
import ProtectedLayout from "../components/Layouts/ProtectedLayout";
import Pack from "./Pack";

export default () => {
  return (
    <ProtectedLayout>
      <PageCenterLayout>
        <Pack />
      </PageCenterLayout>
    </ProtectedLayout>
  );
};

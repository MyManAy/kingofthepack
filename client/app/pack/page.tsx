import PageCenterLayout from "../components/PageCenterLayout";
import ProtectedLayout from "../components/ProtectedLayout";
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

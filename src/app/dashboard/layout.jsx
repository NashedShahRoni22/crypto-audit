import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import Container from "@/components/shared/Container/Container";
import Sidebar from "@/components/shared/Sidebar/Sidebar";

export default function layout({ children }) {
  return (
    <PrivateRoute>
      <div className="lg:grid grid-cols-12">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-10 w-full min-h-screen overflow-auto bg-[#f5f5f5]">
          <Container>{children}</Container>
        </div>
      </div>
    </PrivateRoute>
  );
}

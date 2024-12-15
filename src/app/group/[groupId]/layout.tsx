import CreateGroupModal from "@/features/group/components/create-group-modal";
import Navbar from "@/features/group/components/navbar";
import Sidebar from "@/features/group/components/sidebar";

interface Props {
  children: React.ReactNode;
}

export default function GroupLayout({ children }: Props) {
  return (
    <div className="h-full">
      <CreateGroupModal />
      <nav className="h-10">
        <Navbar />
      </nav>
      <main className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        {children}
      </main>
    </div>
  );
}

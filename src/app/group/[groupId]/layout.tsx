import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChannelList from "@/features/group/components/channel-list";
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
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId="karma-group-layout"
        >
          <ResizablePanel
            defaultSize={20}
            minSize={12}
            className="bg-slate-400"
          >
            <ChannelList />
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}

"use client";

import { useCreateGroupModal } from "../store/use-create-group-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { useCreateGroup } from "../api/use-create-group";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CreateGroupModal() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useCreateGroupModal();
  const { mutate, isLoading } = useCreateGroup();
  const [title, setTitle] = useState<string>("");

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate(
      {
        title,
      },
      {
        onSuccess: (groupId) => {
          toast.success("group created successfully!");
          setIsModalVisible(false);
          router.push(`/group/${groupId}`);
        },
        onError: (error) => {
          toast.error("create group fails");
          console.error(error);
        },
      }
    );
  };

  return (
    <Dialog open={isModalVisible} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <Input
            value={title}
            onChange={handleTitle}
            required
            placeholder="give a group name"
            disabled={isLoading}
          />
          <div>
            <span className="text-sm text-slate-600">
              no group is founded. create group
            </span>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

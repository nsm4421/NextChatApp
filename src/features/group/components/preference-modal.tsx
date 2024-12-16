"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SetStateAction } from "jotai";
import { Edit, Trash2 } from "lucide-react";
import { ChangeEvent, Dispatch, useState } from "react";
import { useEditGroup } from "../api/use-edit-group";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";
import { useGroupIdParam } from "@/hooks/use-table-id";
import { toast } from "sonner";
import { useRemoveGroup } from "../api/use-remove-group";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
}

const MIN_TITLE_LENGTH = 3;
const MAX_TITLE_LENGTH = 30;

export default function PreferenceModal({
  open,
  setOpen,
  title: initialValue,
}: Props) {
  const router = useRouter();
  const groupId = useGroupIdParam();
  const [title, setTitle] = useState<string>(initialValue);
  const [isEditingModalVisible, setIsEditingModalVisible] =
    useState<boolean>(false);
  const [isRemovingModalVisible, setIsRemovingModalVisible] =
    useState<boolean>(false);
  const { mutate: editGroup, isLoading: isEditingGroup } = useEditGroup();
  const { mutate: removeGroup, isLoading: isRemovingGroup } = useRemoveGroup();

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (initialValue === title) {
      return;
    }
    await editGroup(
      {
        groupId,
        title,
      },
      {
        onSuccess: (_) => {
          setIsEditingModalVisible(false);
          toast.success("rename group successfully");
        },
        onError: (_) => {
          toast.error("rename group fails");
        },
      }
    );
  };

  const handleRemove = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await removeGroup(
      {
        groupId,
      },
      {
        onSuccess: (_) => {
          router.replace("/");
          setIsEditingModalVisible(false);
          toast.success("group deleted successfully");
        },
        onError: (_) => {
          toast.error("deleting group fails");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-neutral-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{initialValue}</DialogTitle>

          {/* Edit Group */}
          <div className="flex-col gap-y-2 pt-5">
            <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-neutral-50">
              <Dialog
                open={isEditingModalVisible}
                onOpenChange={setIsEditingModalVisible}
              >
                <DialogTrigger asChild>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-blue-500">
                      Edit Group Name
                    </p>
                    <Edit className="text-blue-500" />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Rename Group</DialogTitle>
                  <form className="space-y-4" onSubmit={handleEdit}>
                    <Input
                      value={title}
                      disabled={isEditingGroup}
                      onChange={handleTitle}
                      placeholder={initialValue}
                      autoFocus
                      minLength={MIN_TITLE_LENGTH}
                      maxLength={MAX_TITLE_LENGTH}
                      required
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" disabled={isEditingGroup}>
                          Cancel
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          type="submit"
                          disabled={initialValue === title || isEditingGroup}
                        >
                          Submit
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Delete Group */}

            <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-neutral-50">
              <Dialog
                open={isRemovingModalVisible}
                onOpenChange={setIsRemovingModalVisible}
              >
                <DialogTrigger asChild>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-rose-500">
                      Delete Group
                    </p>
                    <Trash2 className="text-rose-500" />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Delete Group</DialogTitle>
                  <div>
                    <p className="text-sm">
                      Once you delete group, then you can't restore it
                    </p>
                    <p className="text-sm">Are you sure?</p>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <form onSubmit={handleRemove}>
                        <Button
                          type="submit"
                          variant={"destructive"}
                          disabled={isRemovingGroup}
                        >
                          Delete
                        </Button>
                      </form>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

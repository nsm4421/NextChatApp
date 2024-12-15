"use client";

import { useEffect, useMemo } from "react";
import { useGetGroups } from "../api/use-get-groups";
import { useCreateGroupModal } from "../store/use-create-group-modal";
import CreateGroupModal from "./create-group-modal";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GroupList() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useCreateGroupModal();
  const { data, isLoading } = useGetGroups();
  const currentGroupId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) {
      return;
    } else if (currentGroupId) {
      console.debug(`current group id :${currentGroupId}`);
      router.replace(`/group/${currentGroupId}`);
    } else if (!isModalVisible) {
      setIsModalVisible(true);
    }
    return;
  }, [currentGroupId, isLoading, isModalVisible, setIsModalVisible]);

  return (
    <>
      {isModalVisible && <CreateGroupModal />}
      <ul className="bg-slate-200 flex flex-col gap-y-2">
        {data?.map((item) => (
          <li key={item._id}>
            <div>
              <Link href={`/group/${item._id}`}>
                <h1>{item.title}</h1>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

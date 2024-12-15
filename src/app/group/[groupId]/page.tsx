interface Props {
  params: {
    groupId: string;
  };
}

export default function GroupPage({ params: { groupId } }: Props) {
  return <h1>{groupId}</h1>;
}

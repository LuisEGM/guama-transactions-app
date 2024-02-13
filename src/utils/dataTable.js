const columns = [
  { name: "ID", uid: "id" },
  { name: "NAME", uid: "name", sortable: true },
  { name: "AMOUNT", uid: "amount", sortable: true },
  { name: "STATUS", uid: "status" },
  { name: "DATE", uid: "date", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "PAID", uid: "PAID" },
  { name: "PENDING", uid: "PENDING" },
  { name: "DECLINED", uid: "DECLINED" },
];

export { columns, statusOptions };

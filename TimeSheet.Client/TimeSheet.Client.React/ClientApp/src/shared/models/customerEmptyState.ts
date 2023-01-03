export const customerEmptyState = () => {
  return Object.assign(
    {},
    {
      customerId: null,
      customerName: "",
      contactName: "",
      contactJobTitle: "",
      address: "",
      emailAddress: "",
      bookkeepingNumber: "",
    }
  );
};

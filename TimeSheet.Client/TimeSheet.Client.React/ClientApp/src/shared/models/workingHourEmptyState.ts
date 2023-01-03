export const workingHourEmptyState = () => {
  return Object.assign(
    {},
    {
      workingHoursId: null,
      projectId: "",
      workingDate: "",
      startTime: "",
      endTime: "",
      totalHours: "",
      taskDescription: "",
    }
  );
};

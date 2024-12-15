export const labelStyles = {
  container: "space-y-2",
  labelList: "flex flex-wrap gap-2",
  addButton: "inline-flex items-center px-2 py-1 border dark:border-gray-600 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700",
  labelItem: (color: string) => `inline-flex items-center px-2 py-1 rounded text-white text-sm cursor-pointer ${color}`,
  selector: {
    container: "p-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg border dark:border-gray-600",
    list: "space-y-1",
    item: (color: string) => `px-2 py-1 rounded text-white text-sm cursor-pointer ${color}`
  }
};
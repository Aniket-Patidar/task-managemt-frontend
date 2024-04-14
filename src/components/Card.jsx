import Link from "next/link";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
const Card = ({
  title,
  description,
  status,
  dueDate,
  createdBy,
  handelDelete,
  handelEdit,
  _id,
  index,
}) => {
  const statusColors = {
    pending: "bg-yellow-300",
    completed: "bg-green-300",
    inProgress: "bg-blue-300",
  };

  const getStatusColorClass = (status) => {
    return statusColors[status] || "bg-gray-300";
  };

  const formattedDueDate = new Date(dueDate);

  const displayDueDate = formattedDueDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div class="max-w-sm p-6 h-fit min-w-[300px] bg-white border  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        <p
          className={`px-2 py-1 rounded-lg font-semibold w-fit text-black text-[10px] ${getStatusColorClass(
            status
          )}`}
        >
          {status}
        </p>
        <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-2 font-normal text-sm text-gray-700 dark:text-gray-400 whitespace-normal">
          {description}
        </p>

        <p class="mb-2 font-normal text-sm text-gray-700 dark:text-gray-400">
          Due Date: {displayDueDate}
        </p>

        <div class="flex space-x-2">
          <div
            onClick={() =>
              handelEdit({
                title,
                description,
                status,
                dueDate,
                createdBy,
                _id,
              })
            }
            class="inline-flex cursor-pointer items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit
          </div>
          <div
            onClick={() => handelDelete(_id, index)}
            class="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <RiDeleteBin6Line />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

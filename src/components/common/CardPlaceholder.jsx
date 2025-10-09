import { Card } from "@material-tailwind/react";

const CardPlaceholder = () => (
    <Card className="mt-2 w-full p-5">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    </Card>
);

export default CardPlaceholder;

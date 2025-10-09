import { Card } from "@material-tailwind/react";

const CardPlaceholder = () => (
    <Card className="mt-2 w-full p-5 shadow-lg rounded-lg">
        <div className="animate-pulse flex flex-col gap-4">
            <div className="h-4 bg-gray-300 rounded-full w-48"></div>
            <div className="h-3 bg-gray-300 rounded-full"></div>
            <div className="h-3 bg-gray-300 rounded-full"></div>
            <div className="h-3 bg-gray-300 rounded-full w-3/4"></div>
        </div>
    </Card>
);

export default CardPlaceholder;

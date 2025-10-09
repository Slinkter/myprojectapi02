import { Card, CardBody } from "@material-tailwind/react";

const ProfileSkeleton = () => {
    return (
        <Card className="w-full shadow-xl rounded-2xl animate-pulse">
            <CardBody className="p-6 text-center">
                <div className="h-24 w-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <div className="h-6 w-48 bg-gray-300 rounded mx-auto mb-2"></div>
                <div className="h-4 w-32 bg-gray-300 rounded mx-auto mb-6"></div>
                <div className="h-6 w-56 bg-gray-300 rounded mx-auto mb-4"></div>
                <div className="h-4 w-72 bg-gray-300 rounded mx-auto mb-8"></div>
                <div className="flex flex-wrap justify-center gap-6">
                    <div className="h-5 w-24 bg-gray-300 rounded"></div>
                    <div className="h-5 w-32 bg-gray-300 rounded"></div>
                    <div className="h-5 w-28 bg-gray-300 rounded"></div>
                </div>
            </CardBody>
        </Card>
    );
};

export default ProfileSkeleton;

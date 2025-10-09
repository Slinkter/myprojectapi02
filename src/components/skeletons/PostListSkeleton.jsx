import { Card, CardBody } from "@material-tailwind/react";

const PostListSkeleton = () => {
    return (
        <Card className="w-full shadow-xl rounded-2xl animate-pulse">
            <CardBody>
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 bg-gray-300 rounded"></div>
                    <div className="h-6 w-48 bg-gray-300 rounded"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-12 bg-gray-300 rounded"></div>
                    <div className="h-12 bg-gray-300 rounded"></div>
                    <div className="h-12 bg-gray-300 rounded"></div>
                </div>
            </CardBody>
        </Card>
    );
};

export default PostListSkeleton;

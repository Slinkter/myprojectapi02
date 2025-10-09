import { memo } from 'react';
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

const UserCard = memo(({ user }) => (
    <Card className="mt-2 w-full shadow-lg rounded-lg">
        <CardBody className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                    <Typography variant="h5" color="blue-gray" className="font-bold">
                        {user.name}
                    </Typography>
                    <Typography color="gray" className="text-sm">
                        {user.email}
                    </Typography>
                </div>
                <div className="text-right">
                    <Typography color="gray" className="text-sm">
                        {user.phone}
                    </Typography>
                    <Typography color="blue" className="text-sm font-medium">
                        {user.website}
                    </Typography>
                </div>
            </div>
        </CardBody>
    </Card>
));

UserCard.displayName = 'UserCard';

export default UserCard;

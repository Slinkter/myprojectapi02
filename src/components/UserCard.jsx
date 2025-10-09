import { memo } from 'react';
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

const UserCard = memo(({ user }) => (
    <Card className="mt-2 w-full">
        <CardBody>
            <Typography variant="h5" color="blue-gray">
                {user.name}
            </Typography>
            <Typography>{user.email}</Typography>
            <Typography>{user.phone}</Typography>
            <Typography>{user.website}</Typography>
        </CardBody>
    </Card>
));

UserCard.displayName = 'UserCard';

export default UserCard;

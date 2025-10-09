import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

const NotFoundCard = ({ numberId }) => {
    return (
        <Card className="mt-2 w-full">
            <CardBody>
                <Typography variant="h5" color="red">
                    No existe usuario {numberId}
                </Typography>
                <Typography variant="lead" color="red">
                    Debes escoger entre [1-10]
                </Typography>
            </CardBody>
        </Card>
    );
};

export default NotFoundCard;

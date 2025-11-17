import { Card, CardBody } from "@material-tailwind/react";

const ProfileSkeleton = () => {
    return (
        <Card className="skeleton">
            <CardBody className="profile-skeleton__body">
                <div className="skeleton__item profile-skeleton__avatar"></div>
                <div className="skeleton__item profile-skeleton__line--name"></div>
                <div className="skeleton__item profile-skeleton__line--username"></div>
                <div className="skeleton__item profile-skeleton__line--company"></div>
                <div className="skeleton__item profile-skeleton__line--catchphrase"></div>
                <div className="profile-skeleton__details">
                    <div className="skeleton__item profile-skeleton__detail-item w-24"></div>
                    <div className="skeleton__item profile-skeleton__detail-item w-32"></div>
                    <div className="skeleton__item profile-skeleton__detail-item w-28"></div>
                </div>
            </CardBody>
        </Card>
    );
};

export default ProfileSkeleton;

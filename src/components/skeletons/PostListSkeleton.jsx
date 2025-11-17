import { Card, CardBody } from "@material-tailwind/react";

const PostListSkeleton = () => {
    return (
        <Card className="skeleton">
            <CardBody className="post-list-skeleton__body">
                <div className="post-list-skeleton__header">
                    <div className="skeleton__item post-list-skeleton__header-icon"></div>
                    <div className="skeleton__item post-list-skeleton__header-title"></div>
                </div>
                <div className="post-list-skeleton__items">
                    <div className="skeleton__item post-list-skeleton__item"></div>
                    <div className="skeleton__item post-list-skeleton__item"></div>
                    <div className="skeleton__item post-list-skeleton__item"></div>
                </div>
            </CardBody>
        </Card>
    );
};

export default PostListSkeleton;

import { memo } from 'react';
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

const PostList = memo(({ posts }) => (
    <Card className="w-full">
        <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
                Posts
            </Typography>
            <ul className="text-left">
                {posts.map((item, idx) => (
                    <li key={item.id}>
                        <Typography variant="paragraph">
                            <b>{idx + 1}.</b> {item.title}
                        </Typography>
                    </li>
                ))}
            </ul>
        </CardBody>
    </Card>
));

PostList.displayName = 'PostList';

export default PostList;

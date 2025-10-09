import React, { useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { NewspaperIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

/**
 * Muestra una lista de publicaciones en formato de acordeón.
 * @param {object} props - Propiedades del componente.
 * @param {Array<object>} props.posts - Array de objetos de publicación.
 * @returns {JSX.Element}
 */
const PostList = React.memo(({ posts }) => {
    const [open, setOpen] = useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card className="w-full shadow-xl rounded-2xl bg-white">
            <CardBody>
                <div className="flex items-center gap-3 mb-6">
                    <NewspaperIcon className="h-8 w-8 text-blue-500" />
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="font-bold"
                    >
                        Publicaciones Recientes
                    </Typography>
                </div>
                <div className="space-y-3">
                    {posts.map((post, index) => (
                        <Accordion
                            key={post.id}
                            open={open === index + 1}
                            onClick={() => handleOpen(index + 1)}
                            className="border border-gray-200 rounded-lg transition-shadow shadow-sm hover:shadow-md"
                        >
                            <AccordionHeader className="px-4 text-left text-blue-gray-800 hover:text-blue-600">
                                <Typography
                                    variant="h6"
                                    color="blue-gray"
                                    className="font-semibold capitalize"
                                >
                                    {post.title}
                                </Typography>
                            </AccordionHeader>
                            <AccordionBody className="px-4 pt-0 text-base font-normal text-gray-700">
                                {post.body}
                            </AccordionBody>
                        </Accordion>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
});

PostList.displayName = 'PostList';

PostList.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default PostList;

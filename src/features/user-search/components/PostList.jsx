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
        <Card className="post-list">
            <CardBody>
                <div className="post-list__header">
                    <NewspaperIcon className="post-list__icon" />
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="post-list__title"
                    >
                        Publicaciones Recientes
                    </Typography>
                </div>
                <div className="post-list__items">
                    {posts.map((post, index) => (
                        <Accordion
                            key={post.id}
                            open={open === index + 1}
                            onClick={() => handleOpen(index + 1)}
                            className="post-list__item"
                        >
                            <AccordionHeader className="post-list__item-header">
                                <Typography
                                    variant="h6"
                                    color="blue-gray"
                                    className="post-list__item-title"
                                >
                                    {post.title}
                                </Typography>
                            </AccordionHeader>
                            <AccordionBody className="post-list__item-body">
                                {post.body}
                            </AccordionBody>
                        </Accordion>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
});

PostList.displayName = "PostList";

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

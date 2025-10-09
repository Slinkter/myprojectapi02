/**
 * @file Componente para renderizar una lista de publicaciones con estilo mejorado.
 * @author Tu Nombre
 */

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
import { useState } from "react";

/**
 * Muestra una lista de publicaciones en formato de acordeón.
 * @param {object} props - Propiedades del componente.
 * @param {Array<object>} props.posts - Array de objetos de publicación.
 * @returns {JSX.Element}
 */
function PostList({ posts }) {
    const [open, setOpen] = useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card className="w-full shadow-xl rounded-2xl">
            <CardBody>
                <div className="flex items-center gap-3 mb-4">
                    <NewspaperIcon className="h-8 w-8 text-gray-700" />
                    <Typography variant="h5" color="blue-gray" className="font-bold">
                        Publicaciones Recientes
                    </Typography>
                </div>
                <div className="space-y-2">
                    {posts.map((post, index) => (
                        <Accordion
                            key={post.id}
                            open={open === index + 1}
                            onClick={() => handleOpen(index + 1)}
                            className="border border-blue-gray-100 rounded-lg"
                        >
                            <AccordionHeader className="px-4 text-left">
                                <Typography
                                    variant="h6"
                                    color="blue-gray"
                                    className="font-semibold capitalize"
                                >
                                    {post.title}
                                </Typography>
                            </AccordionHeader>
                            <AccordionBody className="px-4 pt-0 text-base font-normal">
                                {post.body}
                            </AccordionBody>
                        </Accordion>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
}

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
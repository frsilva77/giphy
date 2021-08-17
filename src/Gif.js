import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import debounce from "lodash/debounce";

const Gif = () => {
  const [gifs, setGifs] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [selectedGif, setSelectedGif] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const API_KEY = `5Muqe6HOngq40S9xI6ZQJ7jDfvZUoS5f`;
  const LIMIT = 10;

  const loadGifs = () => {

    const endpoint =
      searchText === ""
        ? `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${LIMIT}`
        : `https://api.giphy.com/v1/stickers/search?api_key=${API_KEY}&limit=${LIMIT}&q=${searchText}`;

    fetch(endpoint).then(async (response) => {
      const responseJson = await response.json();
      setGifs(responseJson.data);
    });
  };

  useEffect(() => {
    loadGifs();
    return () => {};
  }, [searchText]);

  const displayBiggerGif = (gif) => {
    setSelectedGif(gif);
    onOpen(true);
  };

  const debounceSetText = debounce((text) => {
      setSearchText(text)
  }, 200)

  const listItems = gifs.map((gif) => (
    <li key={gif.id}>
      <img alt={gif.title} src={gif.images.preview_gif.url} onClick={() => displayBiggerGif(gif)} />
    </li>
  ));

  return (
    <>
      Search: <input name="search" id="search" onChange={(e) => debounceSetText(e.target.value)} />
      <ul>{listItems}</ul>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Gif</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image boxSize={selectedGif?.images?.original_still?.width} src={selectedGif?.images.original_still?.url} alt={selectedGif?.title} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Gif;

import { useEffect, useState } from "react";
import { usePosts } from "../context/context";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
function List() {
  const { posts } = usePosts();
  const [stores, setStore] = useState(posts);
  useEffect(() => {
    setStore(posts);
  }, [posts]);
  const handleDragDrop = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...stores];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setStore(reorderedStores);
    }
  };
  return (
    <>
      {console.log(posts)}
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              key={stores.id}
            >
              <ul>
                {stores.map((post, i) => (
                  <Draggable draggableId={i.toString()} index={i} key={i}>
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <li key={i}>
                          <h1>{post.title}</h1>
                          <p>{post.body}</p>
                        </li>
                      </div>
                    )}
                  </Draggable>
                ))}
              </ul>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default List;

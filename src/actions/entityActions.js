const addEntities = function(entities) {
  return {
    type: 'ADD_ENTITIES',
    entities
  }
}

const setEntity = function(entityId, entity, entityType = null) {
  return {
    type: 'SET_ENTITY',
    entityType,
    entityId,
    entity
  }
}

export { addEntities, setEntity }

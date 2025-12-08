# Diagrama de Secuencia del Flujo de Datos

Este diagrama de secuencia ilustra el flujo completo de datos e interacciones en la aplicación de búsqueda de usuarios, desde la acción del usuario hasta la visualización de los resultados. Muestra cómo las diferentes capas del proyecto (UI, Hooks, Redux, Capa de Servicios y APIs) se comunican entre sí, incluyendo los diferentes escenarios de respuesta.

Puedes copiar y pegar el siguiente código directamente en [mermaid.live](https://mermaid.live) para visualizar el diagrama de forma interactiva.

```mermaid
sequenceDiagram
    participant Usuario
    participant React_UI
    participant Hooks
    participant Redux_Store
    participant Service_Layer
    participant API_Layer
    participant API_Externa

    %% -- Inicio del Flujo de Búsqueda --

    Usuario->>+React_UI: 1. Escribe ID y hace clic en 'Buscar'

    React_UI->>+Hooks: 2. Llama a la función handleSearch()

    Hooks->>+Redux_Store: 3. Despacha la acción fetchUserAndPosts(id)
    deactivate Hooks

    Redux_Store->>Redux_Store: 4. Reducer 'pending': cambia status a 'loading'
    Redux_Store-->>Hooks: Notifica el nuevo estado 'loading'

    note right of React_UI: La UI se re-renderiza y muestra<br/>los Skeletons de carga.

    Redux_Store->>+Service_Layer: 5. El Thunk (acción asíncrona) llama a fetchUserProfile(id)

    Service_Layer->>API_Layer: 6. Llama a getUser(id) y getPostsByUser(id)
    note right of Service_Layer: Las llamadas se hacen en paralelo (Promise.all)

    activate API_Layer
    par "Llamadas Concurrentes"
        API_Layer->>+API_Externa: 7a. GET /users/{id}
        API_Externa-->>-API_Layer: Respuesta del usuario
    and " "
        API_Layer->>+API_Externa: 7b. GET /users/{id}/posts
        API_Externa-->>-API_Layer: Respuesta de los posts
    end
    deactivate API_Layer

    API_Layer-->>Service_Layer: 8. Devuelve los datos JSON parseados

    Service_Layer-->>-Redux_Store: 9. Devuelve los datos combinados {user, posts}

    alt "Escenario: Éxito"
        Redux_Store->>Redux_Store: 10a. Reducer 'fulfilled':<br/>status='succeeded', guarda los datos de usuario y posts.

    else "Escenario: Usuario No Encontrado"
        note right of Service_Layer: El servicio o el thunk detectan<br/>el caso de 'no encontrado'.
        Redux_Store->>Redux_Store: 10b. Reducer 'fulfilled' o 'rejected':<br/>status='notFound'.

    else "Escenario: Error de Servidor/Red"
        note right of API_Layer: La capa API lanza un error<br/>con el código de estado HTTP.
        Service_Layer-->>Redux_Store: El error se propaga hacia arriba.
        Redux_Store->>Redux_Store: 10c. Reducer 'rejected':<br/>status='failed', guarda el mensaje de error.
    end

    Redux_Store-->>Hooks: 11. Notifica el estado final (succeeded, notFound, o failed)
    activate Hooks
    Hooks-->>React_UI: Pasa el resultado y el estado final a la UI
    deactivate Hooks
    deactivate Redux_Store

    note right of React_UI: La UI se re-renderiza para mostrar el resultado final:<br/>- UserProfile y PostList (éxito)<br/>- NotFoundCard (no encontrado)<br/>- ErrorMessage (fallo)

    deactivate React_UI

```

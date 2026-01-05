# TaskFlow Project

**by Thomas Lucking**

TaskFlow is a simple Todo application built with [Rsbuild](https://rsbuild.rs) and React. It allows users to create, view, and manage their tasks efficiently.

It uses Zustand for State Management and interacts with a PostgREST API for data persistence.

### Key Features

- **Full CRUD**: Create, Read, Update, and Delete tasks.
- **Global State**: Managed via Zustand for snappy UI updates.
- **Bulk Deletion**: Optimized "Delete All" functionality via PostgREST filters.
- **Error Handling**: Centralized error management system.
- **Sorting**: Built-in menu for organizing todos.

---

## Getting Started

### Prerequisites

Ensure you have `pnpm` installed on your system.

### Installation

Install the project dependencies:

```bash
pnpm install
```

### Development

Start the development server. The app will be available at [http://localhost:3000](http://localhost:3000):

```bash
pnpm run dev
```

### Production

Build the application for production:

```bash
pnpm run build
```

Preview the production build locally:

```bash
pnpm run preview
```

---

## Resources

To learn more about Rsbuild, explore the following resources:

- **[Rsbuild Documentation](https://rsbuild.rs)** - explore Rsbuild features and APIs
- **[Rsbuild GitHub Repository](https://github.com/web-infra-dev/rsbuild)** - feedback and contributions welcome

---

## Architecture Overview

### System Architecture

```mermaid
classDiagram
    class App {
        <<Entry Point>>
        +ErrorManagement
        +TaskCreationForm
        +TodoList
    }

    class Store {
        <<Zustand>>
        +useTasksStore
        +tasks[]
        +errorMessage
        +deleteAllTasks()
    }

    class API {
        <<Fetch Wrapper>>
        +taskapi.ts
        +saveTasksViaAPI()
        +deleteAllTasksViaAPI()
    }

    class Form_Components {
        +TaskCreationForm
        +DeleteAllButton
    }

    class Task_Components {
        +TodoList
        +TaskElement
        +SortingMenuTodo
    }

    %% Relationships
    App --> Form_Components : Renders
    App --> Task_Components : Renders
    App --> ErrorManagement : Renders

    Form_Components --> API : Calls
    Task_Components --> Store : Subscribes
    Form_Components --> Store : Dispatches
    API ..> Store : Updates
```

---

### Delete All Tasks Flow

---

```mermaid
graph TD
    %% Define Nodes
    User([User]) -->|Interaction| UI[DeleteAllButton]
    UI -->|Calls API Method| API[taskapi.ts: deleteAllTasksViaAPI]

    subgraph Backend [External Database]
        DB[(PostgREST API)]
    end

    API -->|HTTP DELETE | DB
    DB -->|Returns Deleted Tuples| API

    subgraph StateManagement [Client Side State]
        Store[useTasksStore.ts]
    end

    API -->|Promise Resolved| Store
    Store -->|Sync Local State| UI_Update[TodoList.tsx]

    %% Styling
    style DB fill:#f9f,stroke:#333,stroke-width:2px
    style Store fill:#bbf,stroke:#333,stroke-width:2px
    style API fill:#dfd,stroke:#333,stroke-width:1px
```

---

<div align="center">
  <sub>Built with ❤️ using Rsbuild and React</sub>
</div>

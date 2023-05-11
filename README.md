# Navisaction PEERHOF 2023 ⛰️

This guide provides comprehensive instructions for setting up and maintaining a multi-container platform using Docker in
a production environment. It covers various tasks such as inspecting running containers, reverting to an earlier Git
commit and restarting containers, rebuilding and starting containers in the background, removing orphaned containers,
inspecting volumes, and pulling logs into a temporary file.

## Prerequisites

Before proceeding with the instructions, ensure that the following prerequisites are met:

- Docker is installed on your machine.
- Git is installed on your machine.
- The project source code and configuration files are available locally.

## Setup Instructions

Follow the steps below to set up and run the multi-container platform:

1. Clone the project repository:

   ```shell
   git clone <repository-url>
   cd <project-directory>
   ```

2. Create the `.env` file:

    - In the project root directory, create a new file named `.env`.
    - Add the required environment variables and their corresponding values to the `.env` file.
    - Replace `<value>` with the appropriate values for your setup.
    -

3. Build the Docker images and start the containers:

   ```shell
   docker-compose up --build -d
   ```

   This command will build the Docker images for the services specified in the `docker-compose.yml` file and start the
   containers in detached mode.


4. Access the application:

    - The application should now be accessible at the specified `APP_HOST` and `WEB_PORT` in your browser.

## Maintenance Tasks

### Inspecting Running Containers

To inspect the running Docker containers, use the following command:

```shell
docker ps
```

This command will display information about the running containers, including the container ID, image, status, ports,
and names.

### Reverting to an Earlier Git Commit and Restarting Containers

If you need to revert to an earlier Git commit and restart the containers, follow these steps:

1. Find the commit hash for the desired earlier commit:

   ```shell
   git log
   ```

   This command will display a list of commits with their corresponding hashes.
2. Note the commit hash for the desired earlier commit.


2. Revert to the earlier commit:

   ```shell
   git checkout <commit-hash>
   ```

   Replace `<commit-hash>` with the commit hash you noted in the previous step.


3. Rebuild and restart the containers:

   ```shell
   docker-compose up --build -d
   ```

   This command will rebuild the Docker images and restart the containers using the code from the earlier Git commit.

### Rebuilding and Starting Detached Containers in the Background

To rebuild and start the containers in detached mode (background), use the following command:

```shell
docker-compose up --build -d
```

This command will rebuild the Docker images and start the containers in detached mode, allowing them to run in the
background.

### Removing Orphaned Containers

To remove orphaned containers, i.e., containers that are no longer in use, use the following command:

```shell
docker-compose down --remove-orphans
```

This command will stop and remove any containers that are not defined in the current `docker-compose.yml` file.

### Inspecting Volumes

To inspect the contents of a volume, such as the `certs` volume in this project, use the following command:

```shell
docker volume inspect <volume-name>
```

Replace `<volume-name>` with the name of the volume you want to inspect.

### Inspecting Running Containers

To inspect the details of a running container, including its logs, network, and environment variables, use the following
command:

```shell
docker inspect <container-name>
```

Replace `<container-name>` with the name or container ID of the container you want to inspect.

This command will provide detailed information about the specified container, such as its configuration, network
settings, mounted volumes, and more. You can use this information for troubleshooting or gaining a deeper understanding
of the container's runtime environment.

### Pulling Logs into a Temporary File

To pull the logs from a running container into a temporary file, use the following command:

```shell
docker logs <container-name> > logs.txt
```

Replace `<container-name>` with the name or container ID

# Contribution Guidelines

Thank you for your interest in contributing to this project! Contributions are highly appreciated. To ensure a smooth
collaboration, please follow the guidelines below.

## Getting Started

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix.
4. Make the necessary changes and additions.
5. Test your changes thoroughly.
6. Commit your changes with a descriptive commit message.
7. Push your changes to your forked repository.
8. Submit a pull request to the main repository.

## Code Style

- Follow the existing code style and conventions used in the project.
- Maintain consistent formatting, indentation, and naming conventions.
- Document your code and provide clear and concise comments where necessary.

## Testing

- Ensure that your changes do not introduce any breaking changes or regressions.
- Write test cases to cover your changes whenever possible.
- Run the existing test suite and make sure all tests pass successfully.

## Documentation

- Update the necessary documentation to reflect your changes.
- Provide clear instructions and explanations for new features or modifications.

## Contact

If you have any questions or need assistance, you can reach out to us:

- Authors: Michael W. Czechowski
- Email: github@dailysh.it

## Greetings

Thank you for your interest and support in this project. We, GPT-4 and Michael W. Czechowski, have worked together to
create this contribution guide. Your contributions make a significant impact, and your efforts are greatly appreciated.
Let's build something awesome together!

---

*Note: The above contribution guidelines are meant to provide general guidance. Please refer to the specific guidelines
and requirements mentioned in the repository's README or CONTRIBUTING.md file, if available.*

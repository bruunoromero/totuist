import { Project } from "@doist/todoist-api-typescript";
import { Box, Text } from "ink";
import React from "react";
import useSWR from "swr";
import { useSystem } from "../../hooks/system";
import { Todoist } from "../../system";

type ListProps = { projects: Project[] };

const List: React.FC<ListProps> = ({ projects }) => {
	return (
		<Box flexDirection="column">
			{projects.map((project) => (
				<Box key={project.id}>
					<Text>
						{project.name} {project.id}
					</Text>
				</Box>
			))}
		</Box>
	);
};

const Empty: React.FC = () => {
	return (
		<Box>
			<Text>empty</Text>
		</Box>
	);
};

export const ProjectList: React.FC = () => {
	const api = useSystem(Todoist);
	const { data: projects } = useSWR<Project[]>("getProjects", () =>
		api.getProjects()
	);

	return projects ? <List projects={projects} /> : <Empty />;
};

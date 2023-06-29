"use client";
import { useEffect, useState } from "react";

export default function Home() {
	const [testData, setTestData] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8000/transactions/")
			.then((res) => res.json())
			.then((data) => setTestData(data));

		return () => {};
	}, []);

	return (
		<main>
			<h1>Test Fetch</h1>
			{testData.map((data) => (
				<div key={data.id}>
					<p>Amount: ${data.amount}</p>
					<p>Description: {data.description}</p>
				</div>
			))}
		</main>
	);
}

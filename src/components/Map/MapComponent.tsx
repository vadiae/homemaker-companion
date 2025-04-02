"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { icon } from "leaflet";
import Image from "next/image";
import "leaflet/dist/leaflet.css";

export function MapComponent() {
    const [mounted, setMounted] = useState(false);
    const [key, setKey] = useState(0); // Add a key to force remount when needed

    useEffect(() => {
        setMounted(true);

        // Force a remount after initial mount to handle strict mode double-mounting
        const timer = setTimeout(() => {
            setKey((prev) => prev + 1);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const ICON = icon({
        iconUrl: "/location.png",
        iconSize: [32, 32],
    });

    if (!mounted) {
        return (
            <Card className="h-[750px] w-full max-w-[520px] px-2 py-8">
                <CardBody>
                    <div className="flex justify-center p-4">
                        <Image
                            width={100}
                            height={100}
                            src="/logo.webp"
                            alt={"Evan Home Care Logo"}
                        />
                    </div>
                    <p className="mb-2 text-center font-bold text-primary">
                        Find Us on the Map
                    </p>
                    <p className="mb-2 text-center text-primary">
                        <a
                            href="https://maps.google.com/?q=1101+Miranda+Ln+Suite+127+Kissimmee+FL+34741"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            1101 Miranda Ln. Suite 127 Kissimmee, FL 34741
                        </a>
                    </p>
                    <div className="h-full w-full animate-pulse bg-gray-200" />
                </CardBody>
            </Card>
        );
    }

    return (
        <Card className="h-[750px] w-full max-w-[520px]">
            <CardBody>
                <div className="flex justify-center p-4">
                    <Image
                        width={100}
                        height={100}
                        src="/logo.webp"
                        alt={"Evan Home Care Logo"}
                    />
                </div>
                <p className="mb-2 text-center font-bold text-primary">
                    Find Us on the Map
                </p>
                <p className="mb-2 text-center text-primary">
                    1101 Miranda Ln. Suite 127 Kissimmee, FL 34741{" "}
                </p>

                <div key={key} className="relative h-[450px]">
                    {" "}
                    {/* Set fixed height and relative positioning */}
                    {mounted && (
                        <MapContainer
                            center={[28.34732370882098, -81.41418625023127]}
                            zoom={17}
                            scrollWheelZoom={true}
                            style={{ height: "120%", width: "100%" }} // Set map container dimensions
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker
                                position={[
                                    28.34732370882098, -81.41418625023127,
                                ]}
                                icon={ICON}
                            >
                                <Popup>
                                    Evan Home Care, 1101 Miranda Ln. Suite 127
                                    Kissimmee, FL 34741
                                </Popup>
                            </Marker>
                        </MapContainer>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}

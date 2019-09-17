document.addEventListener("DOMContentLoaded", () => {
	const menuData = {
		header: {
			theme: 'web',
			brand: {
				label: 'Esri Global',
				image: './img/gnav-esri-logo-globe-tm.svg',
				href: 'https://www.esri.com/',
				width: 80,
				height: 30,
				distributorImage: './img/dist-logo.jpg',
				distributorImageWidth: 120,
				distributorImageHeight: 56
			},
			cart: {
				items: 0,
				url: 'https://checkout.esri.com/'
			},
			menus: [
				[
					{
						label: 'Products',
						flyout: [
							{
								category: 'CAPABILITIES',
								cols: [
									{
										col: [
											{
												heading: 'CAPABILITIES',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'CAPABILITIES',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'CAPABILITIES',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									},
									{
										col: [
											{
												heading: 'MAPPING NATION',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									}
								]
							},
							{
								category: 'CAPABILITIES',
								cols: [
									{
										col: [
											{
												heading: 'CAPABILITIES',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'CAPABILITIES',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									},
									{
										col: [
											{
												heading: 'CAPABILITIES2',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											}
										]
									}
								]
							},
							{
								category: 'CAPABILITIES',
								cols: [
									{
										col: [
											{
												heading: 'CAPABILITIES1',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									},
									{
										col: [
											{
												heading: 'CAPABILITIES2',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'CAPABILITIES',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'CAPABILITIES',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									}
								]
							},
							{
								category: 'GIS & MAPPING PRODUCTS',
								cols: [
									{
										col: [
											{
												heading: 'CAPABILITIES1',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'CAPABILITIES',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'CAPABILITIES',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									}
								]
							},
							{
								category: 'LOCATION-ENABLED PRODUCTS',
								cols: [
									{
										col: [
											{
												heading: 'CAPABILITIES1',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'CAPABILITIES',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'CAPABILITIES',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									}
								]
							},
							{
								category: 'EXPLORE MORE',
								cols: [
									{
										col: [
											{
												heading: 'CAPABILITIES1',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'CAPABILITIES',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											},
											{
												heading: 'CAPABILITIES',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									},
									{
										col: [
											{
												heading: 'CAPABILITIES1',
												label: 'Mapping',
												href: 'https://www.esri.com/en-us/location-intelligence'
											},
											{
												heading: 'GIS & MAPPING PRODUCTS',
												label: 'ArcGIS Online',
												href: 'https://www.esri.com/en-us/arcgis-online'
											}
										]
									}
								]
							}
						],
						cols: [
							{
								type: 'single',
								border: 'true',
								items: [
									{
										heading: 'CAPABILITIES',
										label: 'Mapping & Location Enablement',
										href: 'https://www.esri.com/en-us/location-intelligence'
									},
									{
										label: 'Field Operations',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview'
									},
									{
										label: 'Spatial Analysis & Data Science',
										href: 'https://www.esri.com/en-us/location-intelligence'
									},
									{
										label: 'Imagery & Remote Sensing',
										href: 'https://www.esri.com/en-us/location-intelligence'
									},
									{
										label: 'Real-Time Visualization & Analytics',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview'
									},
									{
										label: '3D Visualization & Analytics',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview'
									},
									{
										label: 'Data Management',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview'
									},
									{
										heading: 'EXPLORE MORE',
										label: 'All Products',
										href: 'https://www.esri.com/en-us/location-intelligence'
									},
									{
										label: 'About ArcGIS',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview'
									},
									{
										label: 'How to Buy',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview'
									}
								]
							},
							{
								type: 'structured',
								border: 'false',
								items: [
									{
										heading: 'CORE PRODUCTS',
										label: 'ArcGIS Online',
										href: 'https://www.esri.com/en-us/location-intelligence',
										description: 'Complete SaaS mapping platform'
									},
									{
										label: 'ArcGIS Pro',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview',
										description: 'Next generation desktop GIS'
									},
									{
										label: 'ArcGIS Enterprise',
										href: 'https://www.esri.com/en-us/location-intelligence',
										description: 'Flexible mapping server software'
									},
									{
										label: 'ArcGIS for Developers',
										href: 'https://www.esri.com/en-us/location-intelligence',
										description: 'Develop your own apps'
									},
									{
										label: 'Esri Data & Location Services',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview',
										description: 'Text needed for data and location services'
									}
								]
							},
							{
								type: 'structured',
								border: 'false',
								items: [
									{
										heading: 'FEATURED PRODUCTS',
										label: 'ArcGIS Urban',
										href: 'https://www.esri.com/en-us/location-intelligence',
										description: 'Smart city planning for urban development'
									},
									{
										label: 'ArcGIS Business Analyst',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview',
										description: 'Business and market intelligence'
									},
									{
										label: 'ArcGIS Hub',
										href: 'https://www.esri.com/en-us/location-intelligence',
										description: 'Community engagement and collaboration'
									},
									{
										label: 'ArcGIS Excalibur',
										href: 'https://www.esri.com/en-us/location-intelligence',
										description: 'Imagery exploitation'
									},
									{
										label: 'ArcGIS Mission',
										href: 'https://www.esri.com/en-us/arcgis/analytics/overview',
										description: 'Mission management and situational awareness'
									}
								]
							}
						]
					},
					{
						label: 'Solutions',
						menus: [
							{
								heading: 'PRODUCTS',
								label: 'Architecture, Engineering, and Construction',
								href: 'https://www.esri.com/industries/banking'
							},
							{
								label: 'Banking',
								href: 'https://www.esri.com/industries/banking'
							},
							{
								label: 'Education',
								href: 'https://www.esri.com/industries/education'
							},
							{
								label: 'Electric and Gas Utilities',
								href: 'https://www.esri.com/industries/education'
							},
							{
								label: 'Government',
								href: 'https://www.esri.com/industries/government'
							},
							{
								label: 'Health and Human Services',
								href: 'https://www.esri.com/industries/health'
							},
							{
								label: 'Insurance',
								href: 'https://www.esri.com/industries/insurance'
							},
							{
								label: 'Manufacturing',
								href: 'https://www.esri.com/industries/manufacturing'
							},
							{
								label: 'Natural Resources',
								href: 'https://www.esri.com/industries/natural-resources'
							},
							{
								label: 'Government',
								href: 'https://www.esri.com/industries/government'
							},
							{
								label: 'Health and Human Services',
								href: 'https://www.esri.com/industries/health'
							},
							{
								label: 'Insurance',
								href: 'https://www.esri.com/industries/insurance'
							},
							{
								label: 'Manufacturing',
								href: 'https://www.esri.com/industries/manufacturing'
							},
							{
								label: 'Natural Resources',
								href: 'https://www.esri.com/industries/natural-resources'
							}
						],
						tiles: [
							{
								label: 'Location Strategy',
								href: 'https://www.esri.com/location-strategy',
								icon: [
									'M11.5 27.7a1.8 1.8 0 1 1-1.8 1.8 1.802 1.802 0 0 1 1.8-1.8zm-.75 1.8a.75.75 0 1 0 .75-.75.751.751 0 0 0-.75.75zM28.5 14.7a1.8 1.8 0 1 0 1.8 1.8 1.802 1.802 0 0 0-1.8-1.8zm0 2.55a.75.75 0 1 1 .75-.75.751.751 0 0 1-.75.75zm4 12.45a1.8 1.8 0 1 0 1.8 1.8 1.802 1.802 0 0 0-1.8-1.8zm0 2.55a.75.75 0 1 1 .75-.75.751.751 0 0 1-.75.75zm3-13.55a1.8 1.8 0 1 0 1.8 1.8 1.802 1.802 0 0 0-1.8-1.8zm0 2.55a.75.75 0 1 1 .75-.75.751.751 0 0 1-.75.75zm-29 1.45a1.8 1.8 0 1 1-1.8 1.8 1.802 1.802 0 0 1 1.8-1.8zm-.75 1.8a.75.75 0 1 0 .75-.75.751.751 0 0 0-.75.75zm18.85-15a.9.9 0 1 0 .9-.9.901.901 0 0 0-.9.9zm7 4a.9.9 0 1 0 .9-.9.901.901 0 0 0-.9.9zm-2 23a.9.9 0 1 0 .9-.9.901.901 0 0 0-.9.9zm-12.9 3a.9.9 0 1 0 .9-.9.901.901 0 0 0-.9.9zm-3.1-15a.9.9 0 1 0 .9-.9.901.901 0 0 0-.9.9zm2.083-4.575l-.596-.596a9.32 9.32 0 0 0-.874 2.711l.79.124a8.493 8.493 0 0 1 .68-2.239zm-5.838-5.838l-.466-.466c-.038-.038-.065-.083-.1-.123a17.337 17.337 0 0 0-3.082 8.162l.795.084a16.527 16.527 0 0 1 2.853-7.657zm2.307 2.307a13.347 13.347 0 0 0-1.625 10.469l.774-.202a12.555 12.555 0 0 1 1.433-9.685zM7.31 27.179l-.78.177a17.427 17.427 0 0 0 8.715 11.459l.38-.704A16.632 16.632 0 0 1 7.31 27.179zm6.344 4.177l-.625.5A13.348 13.348 0 0 0 23.5 36.9v-.8a12.55 12.55 0 0 1-9.845-4.745zm1.85-4.688l-.744.295A9.36 9.36 0 0 0 23.5 32.9v-.8a8.563 8.563 0 0 1-7.995-5.433zm4.33 13.844a17.43 17.43 0 0 0 3.665.388v-.8a16.626 16.626 0 0 1-3.497-.37zm1.704 3.496l-.074.797A21.4 21.4 0 0 1 2.198 25.568l.797-.076A20.597 20.597 0 0 0 21.54 44.008zm0-41.016l-.074-.797a21.388 21.388 0 0 0-19.272 19.3l.796.075A20.586 20.586 0 0 1 21.54 2.992zm22.466 18.519l.797-.076a21.401 21.401 0 0 0-19.267-19.24l-.074.797a20.598 20.598 0 0 1 18.544 18.519zM25.46 44.008l.075.797a21.388 21.388 0 0 0 19.272-19.303l-.797-.074a20.586 20.586 0 0 1-18.55 18.58zM20.699 23.5a2.772 2.772 0 0 1 .566-1.67L11.217 11.784l.566-.566 10.048 10.048A2.775 2.775 0 0 1 23.5 20.7a2.8 2.8 0 1 1-2.8 2.8zm2.801-2a2 2 0 1 0 2 2 2.003 2.003 0 0 0-2-2zM23.9 0h-.8v3h.8zm20.131 23.069v.8h3v-.8zM23.1 47h.8v-3h-.8zM3.031 23.131h-3v.8h3z'
								]
							},
							{
								label: 'Operational Intelligence',
								href: 'https://www.esri.com/operational-intelligence',
								icon: [
									'M18 37.9h-7.1V45h-.8v-7.1H3v-.8h7.1V30h.8v7.1H18zM11 17H9v2h2zm3-8v4h4V9zm3 3h-2v-2h2zm16 21h-2v2h2zm-5 4h-1v1h1zm8-9v3h3v-3zm2 2h-1v-1h1zM32.1 3.1v13.148l3.106-4.348H44.9V3.1zm12 8h-9.306L32.9 13.752V3.9h11.2zM42 6.9h-7v-.8h7zm0 2h-7v-.8h7zm-.833 4.6h-.936a19.413 19.413 0 0 1 2.755 9.6H32.83a9.348 9.348 0 0 0-8.93-8.93V4.02a19.412 19.412 0 0 1 6.6 1.289v-.847A20.247 20.247 0 0 0 3.22 23.1l-.004.8a20.345 20.345 0 0 0 3.93 11.6h.997a19.538 19.538 0 0 1-4.126-11.6H14.17a9.348 9.348 0 0 0 8.93 8.93v10.155a19.346 19.346 0 0 1-10.6-3.395v.957A20.27 20.27 0 0 0 43.78 23.9l.006-.8a20.23 20.23 0 0 0-2.619-9.6zM4.02 23.1A19.502 19.502 0 0 1 23.1 4.02v10.15a9.348 9.348 0 0 0-8.93 8.93zm10.93.4a8.55 8.55 0 1 1 8.55 8.55 8.56 8.56 0 0 1-8.55-8.55zm8.95 19.48V32.83a9.348 9.348 0 0 0 8.93-8.93h10.15A19.502 19.502 0 0 1 23.9 42.98zm-.4-22.83a3.35 3.35 0 1 0 3.35 3.35 3.354 3.354 0 0 0-3.35-3.35zm0 5.9a2.55 2.55 0 1 1 2.55-2.55 2.553 2.553 0 0 1-2.55 2.55z'
								]
							},
							{
								label: 'Smart Communities',
								href: 'https://www.esri.com/smart-communities',
								icon: [
									'M7 32.1h4v.8H7zm24 6.8h3.757v-.8H31zm0 2h3.757v-.8H31zm-24-2h4v-.8H7zm20-10.8h-2v.8h2zM7 35.9h4v-.8H7zm20-10.8h-2v.8h2zM47.4 44c0 2.861-13.994 3.9-23.4 3.9S.6 46.861.6 44c0-.737.805-1.337 2.5-1.879V29.1h3v-4h5.6l3.2 4.267V33.1h3.2v-6.233l1-1.334V15h.01l-1.01-1.094V3.843L21.575.1H27.9v6h2v21h4.2v-4.738l3.33-4.262h5.47v23.498c4.016.868 4.5 1.783 4.5 2.402zm-.8 0c0-.032-.053-.773-3.7-1.584V43h-.8V18.9h-4.28l-2.92 3.738V27.9h-5v5.2h2.2v-2h5.8V44h-.8v-8.1h-3v-2h-7v-2h-4.2V44h-.8V31.1h5.8v2h1.2V6.9h-2v-6h-5.175L18.9 4.157v9.437l3 3.25v6.29l-3 4V44h-.8V33.9h-4v-4.267L11.3 25.9H6.9v4h-3V43h-.8v-.039c-1.322.455-1.7.858-1.7 1.039 0 1.294 8.598 3.1 22.6 3.1s22.6-1.806 22.6-3.1zM21.1 22.867v-5.71l-1.2-1.3v8.609zM34.9 33.1v2h2.2v-3.2h-4.2v1.2zm2.2-5.1h.8v-2.791h-.8zM27 19.1h-2v.8h2zm0 3h-2v.8h2zm0-6h-2v.8h2zm0-6h-2v.8h2zM39.1 28h.8v-5h-.8zM27 13.1h-2v.8h2zm-18.6-.6a.9.9 0 1 0-.9.9.901.901 0 0 0 .9-.9zm29.1-.1a.9.9 0 1 1 .9-.9.901.901 0 0 1-.9.9zm1.267 1.705l.697-.394a17.834 17.834 0 0 1 1.28 2.789h-.854a16.573 16.573 0 0 0-1.123-2.396zM31.5 6.125a18.543 18.543 0 0 1 4.292 2.962l-.541.589a18.317 18.317 0 0 0-1.621-1.327 18.097 18.097 0 0 0-2.13-1.314zM4.107 23.512c-.005-.17-.007-.341-.007-.512a18.864 18.864 0 0 1 1.795-8.05l.725.34a18.05 18.05 0 0 0-1.713 8.199L4.5 23.5zm5.66-12.861l-.584-.546A18.775 18.775 0 0 1 16.5 5.257v.856a17.943 17.943 0 0 0-6.733 4.538z'
								]
							}
						]
					},
					{
						label: 'Support & Services',
						menus: [
							{
								label: 'Technical Support',
								href: 'https://support.esri.com/'
							},
							{
								label: 'Training',
								href: 'https://www.esri.com/training'
							},
							{
								label: 'Documentation',
								href: 'https://doc.arcgis.com/en'
							},
							{
								label: 'Consulting Services',
								href: 'https://www.esri.com/arcgis/services/consulting'
							},
							{
								label: 'Managed Cloud Services',
								href: 'https://www.esri.com/arcgis/services/managed-cloud'
							},
							{
								label: 'Esri Enterprise Advantage Program',
								href: 'https://www.esri.com/arcgis/services/eeap'
							},
							{
								label: 'Esri Community (GeoNet)',
								href: 'https://geonet.esri.com/'
							},
							{
								label: 'ArcGIS Blog',
								href: 'https://blogs.esri.com/esri/arcgis/'
							},
							{
								label: 'Contact Esri',
								href: 'https://www.esri.com/about-esri/contact'
							}
						]
					},
					{
						label: 'News',
						menus: [
							{
								label: 'Whats News',
								href: 'https://www.esri.com/about-esri'
							},
							{
								label: 'Good News',
								href: 'https://www.esri.com/about/newsroom/publications/wherenext/'
							},
							{
								label: 'Only Good News',
								href: 'https://www.esri.com/about/newsroom/publications/wherenext/'
							}
						]
					},
					{
						label: 'About',
						menus: [
							{
								label: 'About Esri',
								href: 'https://www.esri.com/about-esri'
							},
							{
								label: 'WhereNext Magazine',
								href: 'https://www.esri.com/about/newsroom/publications/wherenext/'
							},
							{
								label: 'Newsroom',
								href: 'https://www.esri.com/esri-news'
							},
							{
								label: 'Events',
								href: 'https://www.esri.com/events'
							},
							{
								label: 'Partners',
								href: 'https://www.esri.com/partners'
							},
							{
								label: 'Careers',
								href: 'https://www.esri.com/careers/main'
							},
							{
								label: 'Contact Esri',
								href: 'https://www.esri.com/about-esri/contact'
							}
						],
						tiles: [
							{
								label: 'Education',
								href: 'https://www.esri.com/industries/education',
								icon: [
									'M46.887 19.709L23.5 7.549.113 19.709 5.1 22.156V41h.8V22.549l3.2 1.57v9.627c0 2.207 7.748 5.874 14.247 8.563l.153.063.154-.062c6.498-2.69 14.246-6.357 14.246-8.564V24.12zM23.5 8.451l21.613 11.236L23.5 30.296 6.859 22.128l16.694-2.232-.106-.793-17.88 2.391-3.68-1.807zm13.6 25.295c0 1.27-5.458 4.383-13.6 7.76-8.142-3.378-13.6-6.491-13.6-7.76v-9.234l13.6 6.674 13.6-6.674z'
								]
							},
							{
								label: 'Sustainable Development',
								href: 'https://www.esri.com/industries/sustainable-development',
								icon: [
									'M41.242 38.49a13.374 13.374 0 0 0-4.405-19.792 13.276 13.276 0 0 0-3.37-10.155 13.421 13.421 0 0 0-12.939-4.112 13.24 13.24 0 0 0-4.617 2.03l-.003-.004c-.022.015-.042.033-.065.048-.039.028-.081.05-.12.078l.006.008a13.44 13.44 0 0 0-2.812 2.688 13.712 13.712 0 0 0-1.039 1.57l-.01-.005c-.056.096-.104.196-.157.294-.039.072-.086.14-.124.214l.009.004A13.407 13.407 0 0 0 10.1 17.5c0 .403.032.8.067 1.196a13.39 13.39 0 1 0 13.32 23.217 13.384 13.384 0 0 0 15.356-.927 13.494 13.494 0 0 0 1.92-1.91l.02.017c.1-.121.189-.25.285-.374.059-.076.13-.142.186-.219zm-2.897 1.871a12.587 12.587 0 0 1-14.112 1.064 13.38 13.38 0 0 0 1.639-20.503l-.56.572a12.603 12.603 0 1 1-15.037-1.944 13.354 13.354 0 0 0 13.247 11.346 14.064 14.064 0 0 0 3.169-.365l-.18-.779a12.708 12.708 0 0 1-10.847-2.384 12.581 12.581 0 0 1-3.172-15.983 12.828 12.828 0 0 1 1.057-1.616 12.648 12.648 0 0 1 2.757-2.612 12.456 12.456 0 0 1 4.4-1.946 12.627 12.627 0 0 1 12.166 3.867 12.47 12.47 0 0 1 3.185 9.243 13.368 13.368 0 0 0-18.317 8.075l.762.245a12.587 12.587 0 1 1 19.843 13.72z'
								]
							},
							{
								label: 'The Science of Where',
								href: 'https://www.esri.com/about-esri',
								icon: [
									'M8.9 8.9h8V4.1H4.1v12.8h4.8zm-.8 7.2H4.9V4.9h11.2v3.2h-8zm.8 4H4.1v23.8h26.8v-4.8h-22zm21.2 19.8v3.2H4.9V20.9h3.2v19zm-10-35.8v4.8h19v30.2h-5v4.8h9.8V4.1zm23 39h-8.2v-3.2h5V8.1h-19V4.9h22.2z'
								]
							}
						]
					}
				]
			],
			search: {
				label: 'Search',
				dialog: {
					action: 'https://pages.codehub.esri.com/marketing/esri-search-page/',
					label: 'Esri',
					'submitLabel': 'Search',
					'cancelLabel': 'Cancel',
					'queryLabel': 'Search Esri.com'
				}
			},
			notifications: {
				label: 'Notifications',
				dismissAllLabel: 'Dismiss all',
				dismissLabel: 'Dismiss notification',
				clearAllLabel: 'Mark all as read',
				emptyMessage: {
					image: {
						path: ['M15.5 1A14.5 14.5 0 1 0 30 15.5 14.5 14.5 0 0 0 15.5 1zm0 28.1a13.6 13.6 0 1 1 13.6-13.6 13.615 13.615 0 0 1-13.6 13.6zM8.581 17.276l.637-.636 3.288 3.098 10.073-9.92.637.637-10.71 10.556z'],
						viewBox: '0 0 32 32'
					},
					text: "You're up to date!"
				},
				messages: [
					{
						text: 'You accepted the invitation to join the <a href="#">Basemap Gallery</a>.',
						date: 'Yesterday',
						id: '131049582194'
					},
					{
						text: 'You were invited to join the <a href="#">Public Analysis group</a>.',
						date: '2 days ago',
						id: '131049582197'
					},
					{
						text: 'You accepted the invitation to join the <a href="#">Basemap Gallery</a>.',
						date: '3 days ago',
						id: '131049582194'
					},
					{
						text: 'You were invited to join the <a href="#">Public Analysis group</a>.',
						date: '3 days ago',
						id: '131049582197'
					},
					{
						text: 'You accepted the invitation to join the <a href="#">Basemap Gallery</a>.',
						date: '4 days ago',
						id: '131049582194'
					},
					{
						text: 'You were invited to join the <a href="#">Public Analysis group</a>.',
						date: '5 days ago',
						id: '131049582197'
					},
					{
						text: 'You accepted the invitation to join the <a href="#">Basemap Gallery</a>.',
						date: '5 days ago',
						id: '131049582194'
					},
					{
						text: 'You were invited to join the <a href="#">Public Analysis group</a>.',
						date: '1 week ago',
						id: '131049582197'
					},
					{
						text: 'You requested to join the <a href="#">Basemap Gallery</a> group.',
						date: '2 weeks ago',
						id: '131049582199'
					}
				]
			},
			apps: {
				label: 'Applications',
				disableDragAndDrop: false,
				displayIntro: true,
				ieVersion: null,
				text: {
					clear: "Clear",
					confirm: "Got it.",
					dragAppsHere: "Drag apps here that you don't use very often.",
					intro: "Drag and drop your favorite apps in any order to customize your app launcher",
					removed: "This app is no longer available.",
					removedMessage: "Removed app",
					showMore: "Show More"
				},
				primary: [
					{
						abbr: "APP",
						image: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/appstudio.png",
						label: "AppStudio for ArcGIS",
						url: "//appstudiodev.arcgis.com/apps.html",
						canAccess: true,
						itemId: "131049582192"
					},
					{
						abbr: "Studio",
						placeHolderIcon: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/svg-app-icon.svg",
						image: null,
						label: "Studio for ArcGIS",
						url: "//appstudiodev.arcgis.com/apps.html",
						canAccess: true,
						itemId: "131049582193"
					},
					{
						abbr: "Test",
						placeHolderIcon: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/svg-app-circle.svg",
						image: null,
						label: "Test App",
						url: "//appstudiodev.arcgis.com/apps.html",
						canAccess: true,
						isNew: true,
						itemId: "131049582194"
					}
				],
				secondary: [
					{
						abbr: "APP",
						image: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/appstudio.png",
						label: "AppStudio for ArcGIS",
						url: "//appstudiodev.arcgis.com/apps.html",
						canAccess: true,
						itemId: "131049582195"
					},
					{
						abbr: "Studio",
						placeHolderIcon: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/svg-app-icon.svg",
						image: null,
						label: "Studio for ArcGIS",
						url: "//appstudiodev.arcgis.com/apps.html",
						canAccess: false,
						itemId: "131049582196"
					}
				]
			},
			account: {
				label: 'Account Profile',
				controls: {
					signin: 'Sign In',
					signout: 'Sign Out',
					switch: 'Switch Account'
				},
				menus: [
					{
						label: 'Profile & Settings',
						href: '#user-menu-link-1'
					},
					{
						label: 'My Esri',
						href: '#user-menu-link-2'
					},
					{
						label: 'Training',
						href: '#user-menu-link-3'
					},
					{
						label: 'Community & Forums',
						href: '#user-menu-link-4'
					}
				],
				user: {
					name: 'Cesar Marrujo',
					id: 'iamoktatester@gmail.com',
					group: 'Riverside City Mgmt.',
					image: '//placehold.it/300x300'
				}
			}
		},
		footer: {
			hideMenus: false,
			label: 'Esri',
			brand: {
				label: 'Esri: The Science of Where',
				href: 'https://www.esri.com/about-esri',
				viewBox: '0 0 114 90',
				path: './img/gnav-tsow-frame.svg'
			},
			menu: {
				label: 'Esri Sites',
				menu: [
					{
						label: 'ArcGIS',
						menu: [
							{
								label: 'About ArcGIS',
								href: 'https://www.esri.com/arcgis/about-arcgis'
							},
							{
								label: 'ArcGIS Pro',
								href: 'https://www.esri.com/en/arcgis/products/arcgis-pro/Overview'
							},
							{
								label: 'ArcGIS Enterprise',
								href: 'https://www.esri.com/en/arcgis/products/arcgis-enterprise/Overview'
							},
							{
								label: 'ArcGIS Online',
								href: 'https://www.esri.com/software/arcgis/arcgisonline'
							},
							{
								label: 'Apps',
								href: 'https://www.esri.com/software/apps'
							},
							{
								label: 'ArcGIS for Developers',
								href: 'https://developers.arcgis.com/'
							}
						]
					},
					{
						label: 'Community',
						menu: [
							{
								label: 'Esri Community (GeoNet)',
								href: 'https://geonet.esri.com/'
							},
							{
								label: 'ArcGIS Blog',
								href: 'https://blogs.esri.com/esri/arcgis'
							},
							{
								label: 'Early Adopter Community',
								href: 'https://www.esri.com/early-adopter-community'
							},
							{
								label: 'Events',
								href: 'https://www.esri.com/events'
							}
						]
					},
					{
						label: 'Understanding GIS',
						menu: [
							{
								label: 'What is GIS?',
								href: 'https://www.esri.com/what-is-gis'
							},
							{
								label: 'Training',
								href: 'https://www.esri.com/training'
							},
							{
								label: 'Maps We Love',
								href: 'https://www.esri.com/products/maps-we-love'
							},
							{
								label: 'Blog',
								href: 'https://www.esri.com/about/newsroom/blog'
							},
							{
								label: 'WhereNext Magazine',
								href: 'https://www.esri.com/about/newsroom/publications/wherenext/'
							},
							{
								label: 'Learn ArcGIS',
								href: 'https://learn.arcgis.com/en/'
							}
						]
					},
					{
						label: 'Company',
						menu: [
							{
								label: 'About Esri',
								href: 'https://www.esri.com/about-esri'
							},
							{
								label: 'Contact Us',
								href: 'https://www.esri.com/about-esri/contact'
							},
							{
								label: 'Esri Offices Worldwide',
								href: 'https://www.esri.com/about-esri/contact#international'
							},
							{
								label: 'Careers',
								href: 'https://www.esri.com/careers'
							},
							{
								label: 'Open Vision',
								href: 'https://www.esri.com/software/open'
							},
							{
								label: 'Partners',
								href: 'https://www.esri.com/partners'
							}
						]
					},
					{
						label: 'Special programs',
						menu: [
							{
								label: 'Conservation',
								href: 'https://www.esri.com/esri-conservation-program'
							},
							{
								label: 'Disaster Response',
								href: 'https://www.esri.com/services/disaster-response'
							},
							{
								label: 'Education',
								href: 'https://www.esri.com/industries/education'
							},
							{
								label: 'Nonprofit',
								href: 'https://www.esri.com/nonprofit'
							},
							{
								label: 'US Navy SeaPort-e Information',
								href: 'https://www.esri.com/landing-pages/seaport'
							}
						]
					}
				]
			},
			social: {
				label: 'Social Media',
				menu: [
					{
						label: 'Facebook',
						href: 'https://www.facebook.com/esrigis',
						image: {
							viewBox: '0 0 38 38',
							path: ['M38 38V0H0v38h17.2V21.9H14v-5.7h3.2v-3.7c0-2.6 1.2-6.7 6.7-6.7h4.9v5.5h-3.6c-.6 0-1.4.3-1.4 1.5v3.3h5.1l-.6 5.7h-4.5v16.1H38z']
						}
					},
					{
						label: 'Twitter',
						href: 'https://twitter.com/Esri',
						image: {
							viewBox: '0 0 512 512',
							path: ['M512.002 97.211c-18.84 8.354-39.082 14.001-60.33 16.54 21.686-13 38.342-33.585 46.186-58.115a210.29 210.29 0 0 1-66.705 25.49c-19.16-20.415-46.461-33.17-76.674-33.17-58.011 0-105.042 47.029-105.042 105.039 0 8.233.929 16.25 2.72 23.939-87.3-4.382-164.701-46.2-216.509-109.753-9.042 15.514-14.223 33.558-14.223 52.809 0 36.444 18.544 68.596 46.73 87.433a104.614 104.614 0 0 1-47.577-13.139c-.01.438-.01.878-.01 1.321 0 50.894 36.209 93.348 84.261 103a105.245 105.245 0 0 1-27.674 3.687c-6.769 0-13.349-.66-19.764-1.888 13.368 41.73 52.16 72.104 98.126 72.949-35.95 28.176-81.243 44.967-130.458 44.967-8.479 0-16.84-.496-25.058-1.471 46.486 29.807 101.701 47.197 161.021 47.197 193.211 0 298.868-160.062 298.868-298.872 0-4.554-.104-9.084-.305-13.59 20.526-14.809 38.335-33.309 52.417-54.373z']
						}
					},
					{
						label: 'LinkedIn',
						href: 'https://www.linkedin.com/company/esri',
						image: {
							viewBox: '0 0 24 24',
							path: ['M0 0v24h24V0zm8 19H5V8h3zM6.5 6.7A1.8 1.8 0 1 1 8.3 5a1.8 1.8 0 0 1-1.8 1.7zM20 19h-3v-5.6c0-3.4-4-3.1-4 0V19h-3V8h3v1.8c1.4-2.6 7-2.8 7 2.5z']
						}
					},
					{
						label: 'Instagram',
						href: 'https://www.instagram.com/esrigram/',
						image: {
							viewBox: '0 0 30 30',
							path: ['M29.91 8.815c-.073-1.596-.327-2.686-.697-3.64a7.354 7.354 0 0 0-1.73-2.657 7.352 7.352 0 0 0-2.657-1.73C23.87.416 22.78.162 21.184.09 19.584.017 19.074 0 15 0s-4.585.017-6.184.09C7.219.163 6.129.417 5.174.787a7.352 7.352 0 0 0-2.656 1.73 7.354 7.354 0 0 0-1.73 2.657C.416 6.13.162 7.22.09 8.815.017 10.415 0 10.926 0 15s.017 4.585.09 6.184c.073 1.597.327 2.687.697 3.642a7.353 7.353 0 0 0 1.73 2.656 7.353 7.353 0 0 0 2.657 1.73c.955.371 2.045.625 3.642.698 1.6.073 2.11.09 6.184.09s4.585-.017 6.184-.09c1.597-.073 2.687-.327 3.642-.697a7.353 7.353 0 0 0 2.656-1.73 7.353 7.353 0 0 0 1.73-2.657c.371-.955.625-2.045.698-3.642.073-1.6.09-2.11.09-6.184s-.017-4.585-.09-6.185zm-2.997 12.232c-.064 1.412-.287 2.153-.496 2.691a4.376 4.376 0 0 1-1.056 1.623 4.371 4.371 0 0 1-1.622 1.055c-.539.21-1.28.433-2.691.497-1.573.072-2.045.087-6.048.087s-4.475-.015-6.047-.087c-1.412-.064-2.153-.287-2.691-.496a4.376 4.376 0 0 1-1.623-1.056 4.371 4.371 0 0 1-1.055-1.622c-.21-.539-.433-1.28-.497-2.691C3.015 19.475 3 19.003 3 15s.015-4.475.087-6.047c.064-1.412.287-2.153.496-2.691a4.38 4.38 0 0 1 1.056-1.623A4.371 4.371 0 0 1 6.26 3.584c.539-.21 1.28-.433 2.691-.497C10.525 3.015 10.997 3 15 3s4.475.015 6.047.087c1.412.064 2.153.287 2.691.496a4.38 4.38 0 0 1 1.623 1.056c.493.493.8.963 1.055 1.622.21.539.433 1.28.497 2.691.072 1.573.087 2.045.087 6.048s-.015 4.475-.087 6.047zM15 7.175a7.825 7.825 0 1 0 0 15.65 7.825 7.825 0 0 0 0-15.65zm0 12.65c-2.66 0-4.825-2.164-4.825-4.825s2.164-4.825 4.825-4.825 4.825 2.164 4.825 4.825-2.164 4.825-4.825 4.825zm6.007-12.832a2 2 0 1 0 4 0 2 2 0 1 0-4 0']
						}
					},
					{
						label: 'YouTube',
						href: 'https://www.youtube.com/user/esritv',
						image: {
							viewBox: '0 0 310 310',
							path: ['M297.917 64.645c-11.19-13.302-31.85-18.728-71.306-18.728H83.386c-40.359 0-61.369 5.776-72.517 19.938C0 79.663 0 100.008 0 128.166v53.669c0 54.551 12.896 82.248 83.386 82.248h143.226c34.216 0 53.176-4.788 65.442-16.527C304.633 235.518 310 215.863 310 181.835v-53.669c0-29.695-.841-50.16-12.083-63.521zm-98.896 97.765l-65.038 33.991a9.997 9.997 0 0 1-14.632-8.863v-67.764a10 10 0 0 1 14.609-8.874l65.038 33.772a10 10 0 0 1 .023 17.738z']
						}
					},
					{
						label: 'GeoNet',
						href: 'https://geonet.esri.com/',
						image: {
							viewBox: '7 7 16 16',
							path: ['M23 19h-3v4l-4-4H7V9h16z']
						}
					},
					{
						label: 'Google Plus',
						href: 'https://plus.google.com/discover',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/GooglePlus_32.svg'
						}
					},
					{
						label: 'Arc Germany',
						href: 'http://en.arcgermany.com/en/',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/ArcGermany_32.svg'
						}
					},
					{
						label: 'Blogger',
						href: 'https://www.blogger.com',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/Blogger_32.svg'
						}
					},
					{
						label: 'Email',
						href: 'mailto:info@esri.com',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/Contact-Newsletter_32.svg'
						}
					},
					{
						label: 'GisIQ',
						href: 'https://gis-iq.esri.de/',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/GISIQ_32.svg'
						}
					},
					{
						label: 'Pintrest',
						href: 'https://www.pinterest.com/',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/Pinterest_32.svg'
						}
					},
					{
						label: 'Rss',
						href: 'https://en.wikipedia.org/wiki/RSS',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/RSSFeed_32.svg'
						}
					},
					{
						label: 'Tumblr',
						href: 'https://en.wikipedia.org/wiki/RSS',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/Tumblr_32.svg'
						}
					},
					{
						label: 'Xing',
						href: 'https://www.xing.com/en',
						image: {
							viewBox: '0 0 32 32',
							path: 'https://www.esri.com/content/dam/esrisites/common/icons/Xing_32.svg'
						}
					}
				]
			},
			info: {
				label: 'Additional Links',
				menu: [
					{
						label: 'Privacy',
						href: 'https://www.esri.com/legal/privacy'
					},
					{
						label: 'Legal',
						href: 'https://www.esri.com/legal'
					},
					{
						label: 'Site Map',
						href: 'http://www.esri.com/site-map'
					},
					{
						label: 'Terms and Conditions',
						href: 'https://www.esri.com/legal/software-license'
					},
					{
						label: 'Code of Business Conduct',
						href: 'https://www.esri.com/about-esri/code-of-conduct'
					}
				]
			},
			language: {
				label: 'Switch Languages',
				buttonLabel: 'United States (English)',
				submitLabel: 'Change',
				greetingLabel: 'Hello!',
				messageLabel: 'You are seeing the English page. Is this correct?',
				closeLabel: 'Close Navigation',
				optionsLabel: 'Desired Language',
				options: [
					{
						label: 'English',
						value: '#the-english-page'
					},
					{
						label: 'French',
						value: '#the-french-page'
					}, {
						label: 'Spanish',
						value: '#the-spanish-page'
					}
				]
			}
		}
	};

	esriGlobalNav.create({headerElm: '.esri-header-barrier', footerElm: '.esri-footer-barrier', menuData});
});

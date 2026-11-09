
        const inventarioBD = [
            {
                id_motocicleta: 9001,
                placa: "XYZ987",
                marca: "Yamaha",
                modelo: "MT-09 V4",
                anio: 2026,
                precio: 65000000,
                condicion: "Nueva",
                disponibilidad: "Disponible",
                imagen: "img/yamahamt09.jpg"
            },
            {
                id_motocicleta: 9002,
                placa: "ABC123",
                marca: "Yamaha",
                modelo: "XTZ 250",
                anio: 2024,
                precio: 25500000,
                condicion: "Usada",
                disponibilidad: "Disponible",
                imagen: "img/yamahaxtz250.png"
            },
            {
                id_motocicleta: 9003,
                placa: "KTM456",
                marca: "KTM",
                modelo: "Duke 200",
                anio: 2023,
                precio: 14000000,
                condicion: "Usada",
                disponibilidad: "Disponible",
                imagen: "img/ktmduke200.png"
            },
            {
                id_motocicleta: 9004,
                placa: "BMW789",
                marca: "BMW",
                modelo: "F 850 GS",
                anio: 2022,
                precio: 72000000,
                condicion: "Usada",
                disponibilidad: "Disponible",
                imagen: "img/bmwf850gs.jpg"
            },
            {
                id_motocicleta: 9005,
                placa: "HON321",
                marca: "Honda",
                modelo: "CBR 600RR",
                anio: 2025,
                precio: 58000000,
                condicion: "Nueva",
                disponibilidad: "Disponible",
                imagen: "img/hondacbr600rr.jpg"
            },
            {
                id_motocicleta: 9006,
                placa: "KTM390",
                marca: "KTM",
                modelo: "390 Adventure",
                anio: 2023,
                precio: 38990000,
                condicion: "Nueva",
                disponibilidad: "Disponible",
                imagen: "img/ktm390adventure.png"
            },
            {
                id_motocicleta: 9007,
                placa: "YAMR15",
                marca: "Yamaha",
                modelo: "R15 V4.0",
                anio: 2024,
                precio: 16500000,
                condicion: "Nueva",
                disponibilidad: "Disponible",
                imagen: "img/yamahar15v4.jpg"
            },
            {
                id_motocicleta: 9008,
                placa: "AKT250",
                marca: "AKT",
                modelo: "250 R",
                anio: 2024,
                precio: 13028504,
                condicion: "Nueva",
                disponibilidad: "Disponible",
                imagen: "img/akt250r.jpg"
            },
            {
                id_motocicleta: 9009,
                placa: "BMW100",
                marca: "BMW",
                modelo: "S 1000 RR",
                anio: 2023,
                precio: 120000000,
                condicion: "Usada",
                disponibilidad: "Disponible",
                imagen: "img/bmws1000rr.png"
            },
            {
                id_motocicleta: 9010,
                placa: "HON500",
                marca: "Honda",
                modelo: "CB 500X",
                anio: 2024,
                precio: 36000000,
                condicion: "Usada",
                disponibilidad: "Disponible",
                imagen: "img/hondacb500X.png"
            }
        ];

        // --- 2. LÓGICA SPA (Single Page Application Router) ---
        function navigate(hash) {
            if(!hash.startsWith('#')) hash = '#' + hash;
            
            const views = document.querySelectorAll('.page-view');
            const targetView = document.querySelector(hash);

            if (targetView) {
                views.forEach(view => {
                    view.classList.remove('active');
                    view.classList.remove('fade-in');
                });
                
                targetView.classList.add('active');
                void targetView.offsetWidth; 
                targetView.classList.add('fade-in');

                history.pushState(null, null, hash);
                window.scrollTo({ top: 0, behavior: 'smooth' });

                updateNavActiveState(hash);
                
                const mobileMenu = document.getElementById('mobile-menu');
                if(!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            } else {
                navigate('#inicio');
            }
        }

        function updateNavActiveState(hash) {
            document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
                if (link.getAttribute('href') === hash) {
                    link.classList.add('text-white');
                    if(link.classList.contains('nav-link')) {
                        link.style.color = '#FF0000';
                    }
                } else {
                    link.classList.remove('text-white');
                    if(link.classList.contains('nav-link')) {
                        link.style.color = '';
                    }
                }
            });
        }

        // --- 3. RENDERIZADO DEL CATÁLOGO ---
        const formatCurrency = (amount) => {
            return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
        };

        function getMotoImagePosition(moto) {
            if (moto.marca === 'Yamaha' && moto.modelo.includes('XTZ')) {
                return '50% 18%';
            }
            return 'center';
        }

        function renderMotoCard(moto) {
            return `
                <div class="bg-af-gray rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-af-red transition-all duration-300 group">
                    <div class="relative h-72 sm:h-80 overflow-hidden">
                        <img src="${moto.imagen}" alt="${moto.marca} ${moto.modelo}" class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" style="object-position: ${getMotoImagePosition(moto)};">
                        <div class="absolute top-4 left-4 bg-af-black/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded">
                            ${moto.condicion}
                        </div>
                        <div class="absolute top-4 right-4 bg-af-red text-white text-xs font-bold px-3 py-1 rounded">
                            ${moto.anio}
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <p class="text-af-silver text-sm font-montserrat uppercase tracking-wider">${moto.marca}</p>
                                <h3 class="text-xl font-montserrat font-bold text-white">${moto.modelo}</h3>
                            </div>
                        </div>
                        <div class="text-af-red font-montserrat font-black text-2xl mb-4">
                            ${formatCurrency(moto.precio)}
                        </div>
                        <div class="border-t border-gray-700 pt-4 flex justify-between items-center">
                            <span class="text-gray-400 text-xs"><i class="fa-solid fa-hashtag mr-1"></i> ${moto.placa}</span>
                            <a href="https://wa.me/573000000000?text=Hola,%20me%20interesa%20cotizar%20la%20moto%20${moto.marca}%20${moto.modelo}%20placa%20${moto.placa}" target="_blank" class="bg-af-black border border-af-red text-white hover:bg-af-red text-sm font-montserrat font-bold py-2 px-4 rounded transition-colors">
                                Cotizar <i class="fa-brands fa-whatsapp ml-1"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderInventario(data) {
            const featuredGrid = document.getElementById('featured-motos-grid');
            if (featuredGrid) {
                featuredGrid.innerHTML = data.slice(0, 3).map(renderMotoCard).join('');
            }

            const fullGrid = document.getElementById('full-catalog-grid');
            const emptyState = document.getElementById('empty-state');
            const contador = document.getElementById('contador-motos');
            
            if (fullGrid) {
                if (data.length === 0) {
                    fullGrid.innerHTML = '';
                    emptyState.classList.remove('hidden');
                } else {
                    fullGrid.innerHTML = data.map(renderMotoCard).join('');
                    emptyState.classList.add('hidden');
                }
            }
            
            if (contador) contador.innerText = data.length;
        }

        // --- 4. FILTROS DEL CATÁLOGO ---
        function applyFilters() {
            const marcaFilter = document.getElementById('filter-marca').value;
            const condicionFilter = document.getElementById('filter-condicion').value;

            let filteredData = inventarioBD;

            if (marcaFilter !== 'all') {
                filteredData = filteredData.filter(m => m.marca === marcaFilter);
            }
            if (condicionFilter !== 'all') {
                filteredData = filteredData.filter(m => m.condicion === condicionFilter);
            }

            renderInventario(filteredData);
        }

        function resetFilters() {
            document.getElementById('filter-marca').value = 'all';
            document.getElementById('filter-condicion').value = 'all';
            applyFilters();
        }

        // --- 5. UTILIDADES (Event Listeners & Init) ---
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('current-year').innerText = new Date().getFullYear();

            const btn = document.getElementById('mobile-menu-btn');
            const menu = document.getElementById('mobile-menu');
            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
            });

            document.getElementById('filter-marca')?.addEventListener('change', applyFilters);
            document.getElementById('filter-condicion')?.addEventListener('change', applyFilters);

            window.addEventListener('hashchange', () => navigate(window.location.hash));

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    navigate(this.getAttribute('href'));
                });
            });

            popularSimulador();
            renderInventario(inventarioBD);

            const currentHash = window.location.hash || '#inicio';
            navigate(currentHash);
        });

        // --- LÓGICA DEL SIMULADOR FINANCIERO (Basada en Java) ---
        function popularSimulador() {
            const selectMoto = document.getElementById('simulador-moto');
            if(selectMoto) {
                selectMoto.innerHTML = '<option value="">Selecciona una motocicleta...</option>';
                inventarioBD.forEach(moto => {
                    selectMoto.innerHTML += `<option value="${moto.id_motocicleta}">${moto.marca} ${moto.modelo} - ${formatCurrency(moto.precio)}</option>`;
                });
            }
        }

        function simularCompra(e) {
            e.preventDefault();
            const motoId = parseInt(document.getElementById('simulador-moto').value);
            const cuotas = parseInt(document.getElementById('simulador-cuotas').value);

            if (!motoId) return;

            const moto = inventarioBD.find(m => m.id_motocicleta === motoId);
            
            const precio = moto.precio;
            let descuento = 0;
            const iva = 19;

            if (precio >= 50000000) {
                descuento = 15;
            } else if (precio >= 25000000) {
                descuento = 10;
            } else if (precio >= 10000000) {
                descuento = 5;
            } else {
                descuento = 0;
            }

            const valorDescuento = (precio * descuento) / 100;
            const subtotal = precio - valorDescuento;
            const valorIva = (subtotal * iva) / 100;
            const totalAPagar = subtotal + valorIva;
            
            document.getElementById('sim-vehiculo').innerText = `${moto.marca} ${moto.modelo} (Placa: ${moto.placa})`;
            document.getElementById('sim-precio').innerText = formatCurrency(precio);
            document.getElementById('sim-desc-porcentaje').innerText = `${descuento}%`;
            document.getElementById('sim-desc-valor').innerText = `- ${formatCurrency(valorDescuento)}`;
            document.getElementById('sim-subtotal').innerText = formatCurrency(subtotal);
            document.getElementById('sim-iva').innerText = `+ ${formatCurrency(valorIva)}`;
            document.getElementById('sim-total').innerText = formatCurrency(totalAPagar);
            
            const divCuotas = document.getElementById('sim-cuotas-res');
            if (cuotas > 1) {
                const valorCuota = totalAPagar / cuotas;
                divCuotas.innerText = `${cuotas} cuotas mensuales de ${formatCurrency(valorCuota)}`;
            } else {
                divCuotas.innerText = "Modalidad de Pago: De contado";
            }

            const resContainer = document.getElementById('simulador-resultados');
            resContainer.classList.remove('hidden');
            resContainer.classList.add('fade-in');
        }

        function handleFormSubmit(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = 'Enviando...';
            btn.disabled = true;
            btn.classList.add('opacity-70');

            setTimeout(() => {
                e.target.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                btn.classList.remove('opacity-70');
                
                const successMsg = document.getElementById('form-success');
                successMsg.classList.remove('hidden');
                
                setTimeout(() => {
                    successMsg.classList.add('hidden');
                }, 4000);
            }, 1500);
        }
    
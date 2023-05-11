<script>
    import {onMount, onDestroy} from 'svelte';
    import api from '../services/Api';

    let progress = 0;
    let isDragging = false;
    let images = [];

    const openFileBrowser = () => {
        fileInputRef.click();
    };

    const handleFileChange = async (event) => {
        await uploadFiles(Array.from(event.target.files));
    };

    const fetchImages = async () => {
        try {
            const data = await api.allImages();
            images = data.images;
        } catch (error) {
            console.error(error);
        }
    };

    const uploadFiles = async (uploadedFiles) => {
        try {
            const formData = new FormData();
            uploadedFiles.forEach((file) => {
                formData.append('files', file);
            });
            const {files} = await api.upload(formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    // progress = progress;
                    console.log(`Upload progress: ${progress}%`);
                },
            });
            images = [...files.reverse(), ...images];
            fileInputRef.value = null;
        } catch (error) {
            console.error(error);
        }
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        event.stopPropagation();
        isDragging = true;
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        isDragging = true;
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        event.stopPropagation();
        isDragging = false;
    };

    const handleDrop = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        isDragging = false;
        await uploadFiles(Array.from(event.dataTransfer.files));
        fileInputRef.value = null;
    };

    let fileInputRef;

    onMount(() => {
        if (typeof document !== 'undefined') {
            document.addEventListener('dragenter', handleDragEnter);
            document.addEventListener('dragover', handleDragOver);
            document.addEventListener('dragleave', handleDragLeave);
            document.addEventListener('drop', handleDrop);
        }
        fetchImages();
    });

    onDestroy(() => {
        if (typeof document !== 'undefined') {
            document.removeEventListener('dragenter', handleDragEnter);
            document.removeEventListener('dragover', handleDragOver);
            document.removeEventListener('dragleave', handleDragLeave);
            document.removeEventListener('drop', handleDrop);
        }
    });
</script>

<div class="py-10 bg-gray-100 flex flex-col items-center justify-center">
    <div
            class="text-7xl cursor-pointer active:scale-105 hover:scale-110 transition-transform"
            class:scale-110={isDragging}
            on:click={openFileBrowser}
            on:keydown={openFileBrowser}
    >
        {#if isDragging}
            <span>😮</span>
        {:else}
            <span>😗</span>
        {/if}
    </div>
    {#if progress > 0 && progress < 100}
        <div class="font-bold">{progress}%</div>
    {/if}
    <input
            type="file"
            bind:this={fileInputRef}
            class="hidden"
            on:change={handleFileChange}
            multiple
    />
    <div class="relative w-full flex min-h-screen flex-col justify-center px-2 sm:px-6 py-2 sm:py-6">
        <div class="columns-2 xl:columns-3 2xl:columns-4 gap-1 column-fill:balance box-border before:box-inherit after:box-inherit">
            {#each images as image, index}
                <div class="break-inside-avoid overflow-hidden mb-1 bg-gray-100 rounded-lg shadow-lg">
                    <a href={image.original}>
                        <img src={image.thumbnail} alt={image.name} data-meta={JSON.stringify(image)}/>
                    </a>
                </div>
            {/each}
        </div>
    </div>
</div>

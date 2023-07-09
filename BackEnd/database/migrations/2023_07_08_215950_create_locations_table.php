<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('lat', 10, 7);
            $table->decimal('lng', 10, 7);
            $table->timestamps();
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->unsignedBigInteger('location_id')->nullable();
            $table->foreign('location_id')->references('id')->on('locations');
            $table->dropColumn('location'); // remove the old location column
        });
    }



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('postes', function (Blueprint $table) {
            $table->dropForeign(['location_id']);
            $table->dropColumn('location_id');
            $table->text('location')->nullable();
        });

        Schema::dropIfExists('locations');
    }
};
